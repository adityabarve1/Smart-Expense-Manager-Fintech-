import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const SplitForm = ({ expense, showForm, setShowForm }) => {
  console.log(expense);
  const user = JSON.parse(localStorage.getItem('user'));

  const [paidBy, setPaidBy] = useState(user?.email || '');
  const [participants, setParticipants] = useState([{ email: '', mobile: '', share: '' }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    if (expense && expense.amount) {
      setTotalAmount(Number(expense.amount));
      setRemainingAmount(Number(expense.amount));
    }
  }, [expense]);

  useEffect(() => {
    const allocatedAmount = participants.reduce((sum, participant) => {
      return sum + (Number(participant.share) || 0);
    }, 0);
    setRemainingAmount(totalAmount - allocatedAmount);
  }, [participants, totalAmount]);

  const handlePaidByChange = (e) => {
    setPaidBy(e.target.value);
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  };

  const addParticipant = () => {
    setParticipants([...participants, { email: '', mobile: '', share: '' }]);
  };

  const removeParticipant = (index) => {
    if (participants.length === 1) return;
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      transaction: expense._id || '',
      paidBy,
      participants: participants.map(p => ({
        email: p.email,
        mobile: p.mobile,
        share: Number(p.share)
      }))
    };
    try {
      const response = await axios.post(
        'http://localhost:8000/api/splits/create',
        payload
      );
      console.log('Split created:', response.data);
      setShowForm(!showForm);
    } catch (error) {
      console.log('error creating split', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <button 
          onClick={() => setShowForm(false)} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Split Expense</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Paid By</label>
            <input
              type="email"
              value={paidBy}
              onChange={handlePaidByChange}
              className="w-full border rounded p-2 mt-1"
              required
            />
          </div>

          <div className="space-y-4">
            {participants.map((participant, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="email"
                  placeholder="Email"
                  value={participant.email}
                  onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                  className="flex-1 border rounded p-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Mobile"
                  value={participant.mobile}
                  onChange={(e) => handleParticipantChange(index, 'mobile', e.target.value)}
                  className="flex-1 border rounded p-2"
                />
                <input
                  type="number"
                  placeholder="Share"
                  value={participant.share}
                  onChange={(e) => handleParticipantChange(index, 'share', e.target.value)}
                  className="flex-1 border rounded p-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeParticipant(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={addParticipant}
              className="text-blue-500 hover:text-blue-700"
            >
              + Add Participant
            </button>

            <div className="text-sm text-gray-600">
              Remaining Amount: <strong>₹{remainingAmount}</strong>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SplitForm;
