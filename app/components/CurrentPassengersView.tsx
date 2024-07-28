import { ScrollView } from "react-native";
import { ActivePassengerView } from "./ActivePassengerView";
import { PassengersSkeleton } from "./PassengerSkeleton";

export const CurrentPassengers = ({ active, passengers, selectedIndex, onDropOff, onRemove, onPassengerPress, onCancel }: any) => {
    return <ScrollView style={{ padding: 2, flex: 1, display: active ? 'flex' : 'none' }}>
    {
      passengers.map((passenger: any, index: number) => {

        const selected = index === selectedIndex;

        return <ActivePassengerView
          selected={selected}
          index={index}
          key={index}
          passenger={passenger}
          onPassengerPress={(index: number) => {
            if (selected) {
                onPassengerPress(-1);
            } else {
                onPassengerPress(index);
            }
          }}
          onDropOff={onDropOff}
          onRemove={onRemove}
          onCancel={onCancel}
        />;
      })
    }
    {passengers.length === 0 && <PassengersSkeleton />}
    </ScrollView>
};