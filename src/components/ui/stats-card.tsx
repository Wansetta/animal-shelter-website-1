import Icon from "@/components/ui/icon";

interface StatsCardProps {
  icon: string;
  number: string;
  label: string;
  color?: "green" | "blue" | "purple" | "orange";
}

const StatsCard = ({
  icon,
  number,
  label,
  color = "green",
}: StatsCardProps) => {
  const colorClasses = {
    green: "bg-green-500 text-white",
    blue: "bg-blue-500 text-white",
    purple: "bg-purple-500 text-white",
    orange: "bg-orange-500 text-white",
  };

  return (
    <div
      className={`${colorClasses[color]} rounded-lg p-8 text-center shadow-lg`}
    >
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <Icon name={icon} size={32} className="text-white" />
        </div>
      </div>

      <div className="text-4xl font-bold mb-2">{number}</div>

      <div className="text-lg opacity-90">{label}</div>
    </div>
  );
};

export default StatsCard;
