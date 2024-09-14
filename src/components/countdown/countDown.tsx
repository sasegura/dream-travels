import React, { useState, useEffect } from 'react';
import { Text2 } from '../travelCard/style';
import { Subtitle } from '@/app/style';
import { CountdownContainer } from './style';
import { calculateTimeLeft } from '@/utils/countDown';

const Countdown: React.FC<{ targetDate: Date; title: string }> = ({
  targetDate,
  title,
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <CountdownContainer>
      <Text2>
        Your trip to {title} is in <Subtitle>{timeLeft.days}</Subtitle> days
      </Text2>
    </CountdownContainer>
  );
};

export default Countdown;
