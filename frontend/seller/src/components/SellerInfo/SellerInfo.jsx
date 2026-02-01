import { UserIcon, PhoneIcon, EnvelopeIcon, BuildingStorefrontIcon, MapPinIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';
import useSellerInfoStore from '../../stores/SellerInfoStore';

export default function SellerInfo() {

  const {
    businessName,
    gstNumber,
    contactName,
    phone,
    address,
    isComplete,
    loading,
    setField,
    fetchSellerInfo,
  } = useSellerInfoStore();

  const [initialData, setInitialData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const isInitialDataSet = useRef(false);

  useEffect(() => {
    fetchSellerInfo();
  }, []);

  useEffect(() => {
    // Store initial data ONLY ONCE when first loaded
    if (!isInitialDataSet.current && (businessName || gstNumber || contactName || phone || address)) {
      const initial = {
        businessName,
        gstNumber,
        contactName,
        phone,
        address,
      };
      setInitialData(initial);
      isInitialDataSet.current = true;
    }
  }, [businessName, gstNumber, contactName, phone, address]);

  useEffect(() => {
    // Check if current data differs from initial data
    if (isInitialDataSet.current) {
      const currentData = {
        businessName,
        gstNumber,
        contactName,
        phone,
        address,
      };
      
      const changed = Object.keys(currentData).some(
        key => currentData[key] !== initialData[key]
      );
      
      setHasChanges(changed);
    }
  }, [businessName, gstNumber, contactName, phone, address, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete) return;

    console.log({
      businessName,
      gstNumber,
      contactName,
      phone,
      address,
    });
  };

  // Determine if all fields were initially filled
  const wasInitiallyComplete = Object.values(initialData).every(val => val && val.trim() !== '');
  
  // Determine button text
  const getButtonText = () => {
    if (!wasInitiallyComplete) {
      return 'Submit Information';
    }
    if (hasChanges) {
      return 'Update Information';
    }
    return 'Submit Information';
  };

  // Button should be enabled if form is complete AND (was not initially complete OR has changes)
  const isButtonEnabled = isComplete && (!wasInitiallyComplete || hasChanges);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Seller Information</h2>
            <p className="mt-1 text-sm text-purple-600">Please provide your business details</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BuildingStorefrontIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setField("businessName", e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Your Business Name"
                />
              </div>
            </div>

            {/* GST Number */}
            <div>
              <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 mb-2">
                GST Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdentificationIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="gstNumber"
                  value={gstNumber}
                  onChange={(e) => setField("gstNumber", e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="22AAAAA0000A1Z5"
                  maxLength="15"
                />
              </div>
            </div>

            {/* Contact Person Name */}
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setField("contactName", e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Business Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Business Address
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="address"
                  rows="3"
                  value={address}
                  onChange={(e) => setField("address", e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Street, City, State, PIN Code"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isButtonEnabled || loading}
                className="w-full bg-gray-900 text-white py-2.5 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50"
              >
                {getButtonText()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}