import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "../components/ui/drawer";
import { fetchSkips } from "../services/fetchSkips";

const ChooseSkip = () => {
  const [skipSizes, setSkipSizes] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchSkipSizes = async () => {
      const data = await fetchSkips();
      console.log("Fetched skip sizes:", data);
      setSkipSizes(data);
    };

    fetchSkipSizes();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Choose Your Skip Size
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skipSizes.map((skip) => (
          <Card
            key={skip.size}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                {skip.size} Yard Skip
              </CardTitle>
              <CardDescription>
                Perfect for{" "}
                {skip.size <= 6 ? "small to medium projects" : "large projects"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img
                  src="src/assets/skip.jpg"
                  alt={`${skip.size} yard skip`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-amber-600">
                    £{skip.price_before_vat}
                  </span>
                  <span className="text-sm text-gray-500">
                    (Price before VAT)
                  </span>
                </div>
                <Button
                  onClick={() => {
                    setSelectedSkip(skip);
                    setShowDialog(true);
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-600"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Drawer open={showDialog} onOpenChange={setShowDialog}>
        <DrawerContent className="max-h-[90vh]">
          {selectedSkip && (
            <>
              <DrawerHeader className="text-left">
                <DrawerTitle className="text-xl font-bold">
                  {selectedSkip.size} Yard Skip - Hire Details
                </DrawerTitle>
              </DrawerHeader>

              <div className="px-4 pb-4 overflow-y-auto">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedSkip.size} Yard Skip
                      </h3>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl font-bold text-amber-600">
                          £{selectedSkip.price_before_vat}
                        </span>
                        <span className="text-sm text-gray-500">
                          (Price before VAT)
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Hire Details
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex justify-between">
                          <span>Hire Period:</span>
                          <span className="font-medium">14 days</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Skip Size:</span>
                          <span className="font-medium">
                            {selectedSkip.size} cubic yards
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Road Placement:</span>
                          <span
                            className={`font-medium ${
                              selectedSkip.allowed_on_road
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {selectedSkip.allowed_on_road
                              ? "Allowed"
                              : "Not Allowed"}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        What's Included
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Delivery and collection</li>
                        <li>• 14-day hire period</li>
                        <li>• Waste disposal service</li>
                        <li>• Customer support</li>
                      </ul>
                    </div>

                    {!selectedSkip.allowed_on_road && (
                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-800 mb-2">
                          ⚠️ Important Notice
                        </h4>
                        <p className="text-sm text-amber-700">
                          This skip size is not permitted for road placement. It
                          must be placed on private property such as your
                          driveway or garden.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <DrawerFooter className="flex flex-col sm:flex-row gap-2">
                <DrawerClose asChild>
                  <Button variant="outline" className="flex-1">
                    Back to Selection
                  </Button>
                </DrawerClose>
                <Button
                  onClick={() => {
                    alert("Continue to checkout", selectedSkip);
                    // Add your continue logic here (e.g., navigate to booking form)
                    setShowDialog(false);
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600"
                >
                  Continue with This Skip
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ChooseSkip;
