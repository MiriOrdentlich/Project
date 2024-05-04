// OtherData.jsx
import React from 'react';

export default function OtherData(props) {
  return (
    <div style={{ border: '1px solid', padding: '10px' }}>
      <span style={{ textDecoration: 'underline' }}>Street:</span>
      <input name="street" value={props.user.address.street} onChange={props.handleAddressChange} />
      <br />
      <span style={{ textDecoration: 'underline' }}>City:</span>
      <input name="city" value={props.user.address.city} onChange={props.handleAddressChange} />
      <br />
      <span style={{ textDecoration: 'underline' }}>Zip Code:</span>
      <input name="zipcode" value={props.user.address.zipcode} onChange={props.handleAddressChange} />
      <br />
    </div>
  );
}