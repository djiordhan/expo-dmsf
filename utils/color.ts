export const getColor = (type: string) => {
    switch(type) {
      case 'Regular':
        return '#d97706';
      case 'Discounted':
        return '#16a34a';
      default:
        return 'black';
    }
  }