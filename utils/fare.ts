export const calculateFare = (distance: number, isDiscounted?: boolean) => {
    const initialBill = 15;
    const additionalRate = 1;
    let additionalFare = 0;
  
    if (distance > 1) {
      const additionalDistance = distance - 1;
      additionalFare = Math.ceil(additionalDistance / 0.2) * additionalRate;
    }
  
    const totalFare = initialBill + additionalFare;
    const discountedFare = isDiscounted ? totalFare * 0.8 : 0;
  
    return {
      initialBill,
      additionalFare,
      totalFare,
      discountedFare,
    };
  };
  