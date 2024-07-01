import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { useModal } from '../../store';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'descending price', label: 'Цена по убыванию' },
  { value: 'increasing price', label: 'Цена по возрастанию' },
  { value: 'A-Z', label: 'А-Я' },
  { value: 'Z-A', label: 'Я-А' },
];
const SortBy = () => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<Option>>(null);
  const { setSortOption } = useModal((state) => state);

  const handleChange = (option: SingleValue<Option>) => {
    setSortOption(option?.value);
    setSelectedOption(option);
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      isClearable={true}
      placeholder="Выберите..."
    />
  );
};

export default SortBy;
