import React from 'react';
import { Alert } from 'react-bootstrap';

function AlertMessage({ variant, heading, message, onClose }) {
  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {heading && <Alert.Heading>{heading}</Alert.Heading>}
      {message && <p>{message}</p>}
    </Alert>
  );
}

export default AlertMessage;
