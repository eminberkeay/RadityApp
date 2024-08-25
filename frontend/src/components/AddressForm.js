import React, { useState } from "react";
import { createAddress } from "../services/api";

const AddressForm = ({ employeeId }) => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    addressType: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAddress = await createAddress(employeeId, address);
    console.log("Address Created:", newAddress);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="street"
        placeholder="Street"
        value={address.street}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={address.country}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={address.postalCode}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="addressType"
        placeholder="Address Type"
        value={address.addressType}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Address</button>
    </form>
  );
};

export default AddressForm;
