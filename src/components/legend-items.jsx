const LegendItems = ({ item, icon }) => {
  const getTextLabel = () => {
    switch (item.type) {
      case 'earnings':
        return 'Ganhos';
      case 'expenses':
        return 'Despesas';
      case 'investments':
        return 'Investimentos';
    }
  };

  return (
    <div key={item.type} className="flex items-center gap-2">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          {icon}
        </div>
        <p className="text-sm">{getTextLabel()}</p>
        <p className="text-sm">{item.percentage}%</p>
      </div>
    </div>
  );
};

export default LegendItems;
