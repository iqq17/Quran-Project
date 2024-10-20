import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReciter } from '../redux/slices/audioPlayerSlice';
import { RootState } from '../redux/store';
import { Select } from '../components/ui/select';
import { Button } from '../components/ui/button';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const currentReciterId = useSelector((state: RootState) => state.audioPlayer.reciterId);
  const [selectedReciterId, setSelectedReciterId] = useState(currentReciterId.toString());

  const reciters = [
    { value: '7', label: 'Mishari Rashid al-`Afasy' },
    { value: '6', label: 'Mahmoud Khalil Al-Husary' },
    // Add more reciters as needed
  ];

  const handleReciterChange = (value: string) => {
    setSelectedReciterId(value);
  };

  const saveSettings = () => {
    dispatch(setReciter(Number(selectedReciterId)));
    alert('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto p-4 bg-[#f2f1ec]">
      <h1 className="text-3xl font-bold mb-8 text-[#365b6d]">Settings</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#365b6d]">Audio Reciter</h2>
        <Select
          options={reciters}
          onChange={handleReciterChange}
          placeholder="Select a reciter"
        />
        <Button onClick={saveSettings} className="mt-6 bg-[#365b6d] text-white">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
