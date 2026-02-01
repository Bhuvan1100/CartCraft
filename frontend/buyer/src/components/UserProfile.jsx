import React, { useState, useEffect } from 'react';
import { EnvelopeIcon, MapPinIcon, PlusIcon } from '@heroicons/react/24/outline';
import useUserStore from '../Stores/UserStore';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './Spinner/Spinner';

export default function UserProfile() {
  const navigate = useNavigate();
  const { isLoggedIn, email, address, fetchUserAddress, addAddress } = useUserStore();

  const [loading, setLoading] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });

  // Step 1: Check login and fetch data
  useEffect(() => {
    const init = async () => {
      if (!isLoggedIn) {
        navigate('/login');
        return;
      }
      await fetchUserAddress();
      setAddressForm({
        streetAddress: address.streetAddress || "",
        city: address.city || "",
        state: address.state || "",
        zipCode: address.zipCode || "",
        country: address.country || ""
      });
      setLoading(false);
    };
    init();
  }, [isLoggedIn, fetchUserAddress, address, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const hasAddress =
    address.streetAddress &&
    address.city &&
    address.state &&
    address.zipCode &&
    address.country;

  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = () => {
    const { streetAddress, city, state, zipCode, country } = addressForm;
    if (!streetAddress || !city || !state || !zipCode || !country)
      return alert("Fill all fields");
    addAddress(addressForm);
    setIsEditingAddress(false);
  };

  const handleCancelEdit = () => {
    setAddressForm({
      streetAddress: address.streetAddress || "",
      city: address.city || "",
      state: address.state || "",
      zipCode: address.zipCode || "",
      country: address.country || ""
    });
    setIsEditingAddress(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your profile information</p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Contact Details</h2>

          {/* Email */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="shrink-0">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <EnvelopeIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="text-base text-gray-900 mt-1">{email}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-4">
            <div className="shrink-0">
              <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                <MapPinIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-500">Address</p>

              {!hasAddress && !isEditingAddress ? (
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Address
                </button>
              ) : isEditingAddress ? (
                <div className="mt-2 space-y-3">
                  <input
                    type="text"
                    name="streetAddress"
                    value={addressForm.streetAddress}
                    onChange={handleAddressChange}
                    placeholder="Street Address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    name="city"
                    value={addressForm.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    name="state"
                    value={addressForm.state}
                    onChange={handleAddressChange}
                    placeholder="State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={addressForm.zipCode}
                    onChange={handleAddressChange}
                    placeholder="ZIP Code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    name="country"
                    value={addressForm.country}
                    onChange={handleAddressChange}
                    placeholder="Country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <div className="flex space-x-2 pt-2">
                    <button onClick={handleSaveAddress} className="px-4 py-2 bg-gray-900 text-white rounded-lg">Save</button>
                    <button onClick={handleCancelEdit} className="px-4 py-2 bg-white border rounded-lg">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 space-y-1">
                  <p>{address.streetAddress}</p>
                  <p>{address.city}, {address.state}</p>
                  <p>ZIP: {address.zipCode}</p>
                  <p>{address.country}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
