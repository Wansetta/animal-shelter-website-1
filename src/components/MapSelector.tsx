import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapSelectorProps {
  onLocationSelect?: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
  selectedLocation?: { lat: number; lng: number; address: string } | null;
}

const MapSelector = ({
  onLocationSelect,
  selectedLocation,
}: MapSelectorProps) => {
  const [isMapMode, setIsMapMode] = useState(false);
  const [tempMarker, setTempMarker] = useState<{ x: number; y: number } | null>(
    null,
  );

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMapMode) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Имитируем координаты (в реальном приложении здесь был бы API карт)
    const lat = 55.7558 + (y - rect.height / 2) * 0.0001;
    const lng = 37.6176 + (x - rect.width / 2) * 0.0001;

    setTempMarker({ x, y });

    // Имитируем геокодинг
    const mockAddress = `ул. Примерная, ${Math.floor(Math.random() * 100)}, Москва`;

    if (onLocationSelect) {
      onLocationSelect({ lat, lng, address: mockAddress });
    }

    setIsMapMode(false);
  };

  const toggleMapMode = () => {
    setIsMapMode(!isMapMode);
    if (isMapMode) {
      setTempMarker(null);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        onClick={toggleMapMode}
        className={`flex items-center gap-2 ${isMapMode ? "bg-primary text-white" : ""}`}
      >
        <MapPin size={16} />
        {isMapMode ? "Отменить" : "Указать на карте"}
      </Button>

      <div
        className={`relative bg-gradient-to-br from-green-100 to-blue-100 h-64 rounded-md overflow-hidden border-2 transition-all duration-200 ${
          isMapMode
            ? "border-primary cursor-crosshair shadow-lg"
            : "border-gray-200 cursor-default"
        }`}
        onClick={handleMapClick}
      >
        {/* Имитация карты с улицами */}
        <div className="absolute inset-0">
          <div className="absolute top-12 left-8 w-48 h-1 bg-gray-400 opacity-60"></div>
          <div className="absolute top-24 left-16 w-32 h-1 bg-gray-400 opacity-60"></div>
          <div className="absolute top-36 left-4 w-56 h-1 bg-gray-400 opacity-60"></div>
          <div className="absolute top-16 left-20 w-1 h-24 bg-gray-400 opacity-60"></div>
          <div className="absolute top-8 left-40 w-1 h-32 bg-gray-400 opacity-60"></div>
        </div>

        {/* Маркер выбранного места */}
        {(tempMarker || selectedLocation) && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-full animate-bounce"
            style={{
              left: tempMarker?.x || "50%",
              top: tempMarker?.y || "50%",
            }}
          >
            <div className="bg-red-500 rounded-full p-2 shadow-lg">
              <MapPin className="h-4 w-4 text-white" />
            </div>
          </div>
        )}

        {/* Инструкция */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isMapMode ? (
            <div className="bg-white/90 rounded-lg p-4 text-center shadow-lg">
              <p className="text-sm font-medium text-gray-700">
                Нажмите на карте, чтобы указать место
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                {selectedLocation
                  ? "Место выбрано"
                  : 'Нажмите "Указать на карте" для выбора места'}
              </p>
              {selectedLocation && (
                <p className="text-xs text-gray-400 mt-1">
                  {selectedLocation.address}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSelector;
