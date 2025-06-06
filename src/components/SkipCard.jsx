import { Card, CardContent } from "./ui/card";

export default function SkipCard({ skip, onSelect, selected }) {
  const { size, price_before_vat, allowed_on_road } = skip;

  return (
    <Card
      className={`w-full max-w-md p-4 shadow-md transition-all duration-200 border-2 m-4 hover:bg-amber-50 hover:shadow-lg cursor-pointer transform hover:scale-105 ${
        selected
          ? "border-amber-400 bg-amber-50 shadow-lg"
          : "border-gray-200 hover:border-amber-300"
      }`}
      onClick={() => onSelect(skip)}
    >
      <CardContent className="flex flex-col gap-4 p-0">
        {selected && (
          <div className="bg-amber-400 text-black font-bold text-center py-2 rounded-md animate-pulse">
            ✓ Selected
          </div>
        )}
        <div className="relative">
          <img
            src="src/assets/skip.jpg"
            alt={`${size} yard skip`}
            className="w-full h-60 object-cover rounded-md"
          />
          {!allowed_on_road && (
            <div className="absolute bottom-2 left-2 bg-black text-amber-300 text-xs font-semibold px-2 py-1 rounded shadow">
              🚫 Not allowed on road
            </div>
          )}
          <div className="absolute top-2 right-2 bg-amber-400 text-black text-xs font-semibold px-2 py-1 rounded shadow">
            {size} Yards
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {size} Yard Skip
          </h3>
          <p className="text-sm text-gray-600">14 day hire period</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-amber-600">
              £{price_before_vat}
            </span>
            <span className="text-xs text-gray-500">before VAT</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
