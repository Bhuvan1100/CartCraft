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
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    phone: ""
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
        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        pincode: address.pincode || "",
        phone: address.phone || ""
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
    address.addressLine1 && address.addressLine2 && address.pincode && address.phone;

  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = () => {
    const { addressLine1, addressLine2, pincode, phone } = addressForm;
    if (!addressLine1 || !addressLine2 || !pincode || !phone) return alert("Fill all fields");
    addAddress(addressForm);
    setIsEditingAddress(false);
  };

  const handleCancelEdit = () => {
    setAddressForm({
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      pincode: address.pincode || "",
      phone: address.phone || ""
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
                    name="addressLine1"
                    value={addressForm.addressLine1}
                    onChange={handleAddressChange}
                    placeholder="Street, apartment, suite, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    name="addressLine2"
                    value={addressForm.addressLine2}
                    onChange={handleAddressChange}
                    placeholder="City, district, area"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={addressForm.pincode}
                    onChange={handleAddressChange}
                    placeholder="PIN code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={addressForm.phone}
                    onChange={handleAddressChange}
                    placeholder="Phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <div className="flex space-x-2 pt-2">
                    <button onClick={handleSaveAddress} className="px-4 py-2 bg-gray-900 text-white rounded-lg">Save</button>
                    <button onClick={handleCancelEdit} className="px-4 py-2 bg-white border rounded-lg">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="mt-1 space-y-1">
                  <p>{address.addressLine1}</p>
                  <p>{address.addressLine2}</p>
                  <p>PIN: {address.pincode}</p>
                  <p>Phone: {address.phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
