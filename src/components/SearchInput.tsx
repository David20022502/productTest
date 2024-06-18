import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {CustomUtils} from '../utils/CustomConstans';
import {I18n} from 'aws-amplify';
import {useDebounce} from '@uidotdev/usehooks';
type searchValueType = string | undefined;
interface SearchInputProps {
  onSearch?: (value: searchValueType) => void;
  onCancel?: () => void;
}
const searchInput = (props: TextInputProps & SearchInputProps) => {
  const [searchValue, setSearchValue] = useState<searchValueType>();
  const debouncedSearchTerm = useDebounce(searchValue, 300);
  useEffect(() => {
    if (debouncedSearchTerm && props.onSearch) {
      props.onSearch(searchValue);
    }
  }, [debouncedSearchTerm]);
  return (
    <TextInput
      {...props}
      returnKeyType="search"
      accessibilityRole="search"
      value={searchValue}
      onChangeText={value => {
        setSearchValue(value);
        if (!value && props.onCancel) props.onCancel();
      }}
      style={style.inputContainer}
      placeholder={I18n.get('SEACRH')}
    />
  );
};
export default searchInput;
const style = StyleSheet.create({
  inputContainer: {
    borderColor: CustomUtils.colors.gray,
    borderWidth: 0.5,
    borderRadius: 5,
  },
});
