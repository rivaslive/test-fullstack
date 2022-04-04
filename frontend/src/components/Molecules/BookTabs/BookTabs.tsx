import { TabItemStyle, TabStyle } from './style';

export type TabType = 'returned' | 'requested';

interface BookTabsProps {
  activeKey: TabType;
  onChange?: (key: TabType) => void;
}

const BookTabs = ({ activeKey, onChange }: BookTabsProps) => {
  const onInternalChange = (key: TabType) => {
    onChange && onChange(key);
  };

  return (
    <TabStyle>
      <TabItemStyle
        $isActive={activeKey === 'requested'}
        onClick={() => onInternalChange('requested')}
      >
        Requested
      </TabItemStyle>
      <TabItemStyle
        $isActive={activeKey === 'returned'}
        onClick={() => onInternalChange('returned')}
      >
        Returned
      </TabItemStyle>
    </TabStyle>
  );
};

export default BookTabs;
