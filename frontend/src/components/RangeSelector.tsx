import { useState } from 'react';
import styled from 'styled-components';

type Range = '1Y' | '5Y' | '10Y' | 'ALL';

interface RangeSelectorProps {
  onChange: (range: Range) => void;
}

const SelectorContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

// Button 컴포넌트에서 active를 $active로 변경
const Button = styled.button<{ $active: boolean }>`
  background-color: ${props => props.$active ? '#4a4a4a' : '#2a2a2a'};
  color: ${props => props.$active ? '#fff' : '#888'};
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #4a4a4a;
  }
`;

const RangeSelector = ({ onChange }: RangeSelectorProps) => {
  const [activeRange, setActiveRange] = useState<Range>('ALL');
  const ranges: Range[] = ['1Y', '5Y', '10Y', 'ALL'];
  
  const handleRangeChange = (range: Range) => {
    setActiveRange(range);
    onChange(range);
  };

  return (
    <SelectorContainer>
      {ranges.map((range) => (
        <Button
          key={range}
          $active={activeRange === range} // active 대신 $active로 변경
          onClick={() => handleRangeChange(range)}
        >
          {range === 'ALL' ? '전체' : range}
        </Button>
      ))}
    </SelectorContainer>
  );
};

export default RangeSelector;