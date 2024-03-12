import React, { useEffect, useState } from 'react';
const ChatraIntegration = ({setup, integration}) => {
  useEffect(() => {
    (function(d, w, c) {
        w.ChatraSetup = setup
        if(integration) w.ChatraIntegration = integration;
        w.ChatraID = 'gp6JBHnBdcYQfrBRY';
        var s = d.createElement('script');
        w[c] = w[c] || function() {
            (w[c].q = w[c].q || []).push(arguments);
        };
        s.async = true;
        s.src = 'https://call.chatra.io/chatra.js';
        if (d.head) d.head.appendChild(s);
    })(document, window, 'Chatra');
  }, [setup, integration]); 
  return null; 
};

export default ChatraIntegration;
