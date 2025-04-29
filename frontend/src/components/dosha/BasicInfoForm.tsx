import React from 'react';

type BasicInfoFormProps = {
  onSubmit: (data: { age: string; gender: string; lifestyle: string }) => void;
};

export function BasicInfoForm({ onSubmit }: BasicInfoFormProps) {
  const [formData, setFormData] = React.useState({
    age: '',
    gender: '',
    lifestyle: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-serif font-bold text-[#4F7942] mb-6">Basic Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="age" className="block text-[#5A7184] font-medium mb-2">
              Age
            </label>
            <select
              id="age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4F7942] focus:border-transparent"
              required
            >
              <option value="">Select your age range</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-45">36-45</option>
              <option value="46-55">46-55</option>
              <option value="56+">56+</option>
            </select>
          </div>

          <div>
            <label className="block text-[#5A7184] font-medium mb-2">Gender</label>
            <div className="grid grid-cols-3 gap-4">
              {['Male', 'Female', 'Prefer not to say'].map((option) => (
                <label
                  key={option}
                  className={`
                    flex items-center justify-center p-3 rounded-lg border cursor-pointer
                    ${formData.gender === option
                      ? 'bg-[#4F7942] text-white border-transparent'
                      : 'border-gray-300 hover:border-[#4F7942]'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="sr-only"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="lifestyle" className="block text-[#5A7184] font-medium mb-2">
              Lifestyle
            </label>
            <select
              id="lifestyle"
              value={formData.lifestyle}
              onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4F7942] focus:border-transparent"
              required
            >
              <option value="">Select your lifestyle</option>
              <option value="sedentary">Sedentary</option>
              <option value="moderately-active">Moderately Active</option>
              <option value="active">Active</option>
              <option value="very-active">Very Active</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4F7942] text-white py-3 rounded-lg hover:bg-[#3E5F34] transition-colors"
          >
            Continue to Questionnaire
          </button>
        </form>
      </div>
    </div>
  );
}