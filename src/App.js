import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function WonderfulCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Create audio context for button sounds
  const playSound = (frequency = 400, duration = 50) => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const handleNumber = (num) => {
    playSound(300 + num * 20, 60);
    setDisplay(display === '0' ? num.toString() : display + num);
  };

  const handleOperator = (op) => {
    playSound(500, 80);
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleEquals = () => {
    playSound(600, 100);
    try {
      const fullEquation = equation + display;
      // eslint-disable-next-line
      const result = eval(input);
      const result = eval(fullEquation.replace(/×/g, '*').replace(/÷/g, '/'));
      setDisplay(result.toString());
      setEquation('');
    } catch (e) {
      setDisplay('Error');
      setEquation('');
    }
  };

  const handleClear = () => {
    playSound(200, 100);
    setDisplay('0');
    setEquation('');
  };

  const handleDecimal = () => {
    playSound(350, 60);
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ value, onClick, className = '', span = false }) => (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden
        ${span ? 'col-span-2' : ''}
        ${className}
        text-xl font-semibold rounded-2xl
        transition-all duration-200
        hover:scale-105 hover:shadow-2xl
        active:scale-95
        transform
        before:absolute before:inset-0
        before:bg-white before:opacity-0
        before:transition-opacity before:duration-300
        hover:before:opacity-20
        shadow-lg
      `}
    >
      <span className="relative z-10">{value}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
          {/* Sound Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            >
              {soundEnabled ? <Volume2 className="text-white" size={20} /> : <VolumeX className="text-white" size={20} />}
            </button>
          </div>

          {/* Display */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 mb-6 shadow-inner">
            <div className="text-white/60 text-sm mb-1 h-6 font-mono">
              {equation}
            </div>
            <div className="text-white text-4xl font-bold text-right font-mono break-all">
              {display}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">
            <Button 
              value="C" 
              onClick={handleClear}
              className="bg-gradient-to-br from-red-500 to-red-600 text-white"
            />
            <Button 
              value="÷" 
              onClick={() => handleOperator('÷')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
            />
            <Button 
              value="×" 
              onClick={() => handleOperator('×')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
            />
            <Button 
              value="−" 
              onClick={() => handleOperator('-')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
            />

            <Button 
              value="7" 
              onClick={() => handleNumber(7)}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white"
            />
            <Button 
              value="8" 
              onClick={() => handleNumber(8)}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white"
            />
            <Button 
              value="9" 
              onClick={() => handleNumber(9)}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white"
            />
            <Button 
              value="+" 
              onClick={() => handleOperator('+')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white row-span-2"
            />

            <Button 
              value="4" 
              onClick={() => handleNumber(4)}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white"
            />
            <Button 
              value="5" 
              onClick={() => handleNumber(5)}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white"
            />
            <Button 
              value="6" 
              onClick={() => handleNumber(6)}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white"
            />

            <Button 
              value="1" 
              onClick={() => handleNumber(1)}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white"
            />
            <Button 
              value="2" 
              onClick={() => handleNumber(2)}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white"
            />
            <Button 
              value="3" 
              onClick={() => handleNumber(3)}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white"
            />
            <Button 
              value="=" 
              onClick={handleEquals}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white row-span-2"
            />

            <Button 
              value="0" 
              onClick={() => handleNumber(0)}
              span={true}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white"
            />
            <Button 
              value="." 
              onClick={handleDecimal}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/80 text-sm">
          ✨ try new calculator ✨
        </div>
      </div>
    </div>
  );
}