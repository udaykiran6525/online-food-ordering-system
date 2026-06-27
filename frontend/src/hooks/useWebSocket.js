import { useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = (topic, onMessage, enabled = true) => {
  const clientRef = useRef(null);
  const subscriptionRef = useRef(null);

  const connect = useCallback(() => {
    if (!enabled || !topic) return;

    const client = new Client({
      webSocketFactory: () => new SockJS('/ws'),
      reconnectDelay: 5000,
      onConnect: () => {
        subscriptionRef.current = client.subscribe(topic, (message) => {
          try {
            const data = JSON.parse(message.body);
            onMessage(data);
          } catch (e) {
            console.error('Failed to parse WebSocket message', e);
          }
        });
      },
      onDisconnect: () => {
        console.log('WebSocket disconnected');
      },
      onStompError: (frame) => {
        console.error('STOMP error', frame);
      },
    });

    client.activate();
    clientRef.current = client;
  }, [topic, onMessage, enabled]);

  useEffect(() => {
    connect();
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [connect]);

  return clientRef.current;
};

export default useWebSocket;
