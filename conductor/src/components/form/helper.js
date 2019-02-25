import React from 'react';

export const PropState = props =>
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre>
      <strong>props</strong> ={' '}
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>;

export const passFormType = formType => {
  // document.getElementById("ticket-form").values.formType = formType;

};


export const disableEnterButton = (event) => {
  if (event.target.type !== 'textarea') {
    if (event.which === 13 ) {
      event.preventDefault();
    }
  }
  else {
    if (event.which === 13 ) {
      event.value = event.value + "\n";
    }
  }

};