import { act, render, screen } from '@testing-library/react';
import Countdown from './countDown';
import '@testing-library/jest-dom';
import { calculateTimeLeft } from '@/utils/countDown';

describe('Countdown Component', () => {
  it('must correctly calculate the time remaining until a future date', () => {
    const futureDate = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
    const timeLeft = calculateTimeLeft(futureDate);
    expect(timeLeft.days).toBe(5);
  });

  it('must render the text with the remaining days', () => {
    const futureDate = new Date(new Date().getTime() + 5 * 24 * 61 * 60 * 1000);
    render(<Countdown targetDate={futureDate} title='Hawaii' />);

    expect(screen.getByText(/Your trip to Hawaii is in/i)).toBeInTheDocument();

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('must update the remaining time dynamically', () => {
    jest.useFakeTimers();

    const futureDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
    const { rerender } = render(
      <Countdown targetDate={futureDate} title='Paris' />
    );

    expect(screen.getByText('2')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(60 * 1000);
    });

    rerender(<Countdown targetDate={futureDate} title='Paris' />);

    expect(screen.getByText('1')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(24 * 60 * 60 * 1000);
    });

    rerender(<Countdown targetDate={futureDate} title='Paris' />);

    expect(screen.getByText('0')).toBeInTheDocument();

    jest.useRealTimers();
  });
});
