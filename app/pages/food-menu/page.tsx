'use client'
import Tab from '@/src/components/tabs'
import NewDish from '../food-categories/new-dish/page';
import AfricanGiant from '../food-categories/african-giant/page';

const FoodMenu = () => {
  const items = [
    {
      key: "1",
      label: "New Dishes",
      children: <NewDish />
    },
    {
      key: "2",
      label: "African Giant",
      children: <AfricanGiant />
    },
    // {
    //   key: "3",
    //   label: "Machine Installation",
    //   // children: <Machine />,
    // },
    // {
    //   key: "4",
    //   label: "Solar Installation",
    //   // children: <Solar />,
    // },
  ];

  const onChange = (key: string) => { };
  
  return (
    <div className="bg-white">
      <div className="pl-2 text-gray-400 font-semibold">
        <Tab defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default FoodMenu;
