import TabBtn from "./TabBtn";

export type TabControls = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

// type MyFunc<T> = (props: T) => string;
// const myFunc: MyFunc<TabControls> = ({activeTab, setActiveTab}) => {
//   return ''
// };

const MobileTodoTabControls: React.FC<TabControls> = ({ activeTab, setActiveTab }) => {
  return (
    <section className="mobile-todo-tab-controls content-block">
      <TabBtn tabName="All" isActive={activeTab === 'all'} setActiveTab={setActiveTab} />
      <TabBtn tabName="Active" isActive={activeTab === 'active'} setActiveTab={setActiveTab} />
      <TabBtn tabName="Completed" isActive={activeTab === 'completed'} setActiveTab={setActiveTab} />
    </section>
  )
}

export default MobileTodoTabControls