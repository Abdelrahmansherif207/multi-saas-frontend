// Mock Properties Data for Admin Dashboard
export interface MockProperty {
    id: string;
    name: string;
    type: string;
    typeId: string;
    area: string;
    areaId: string;
    compound: string;
    compoundId: string;
    developer: string;
    developerId: string;
    address: string;
    city: string;
    developerPrice: number;
    resalePrice: number;
    bedrooms: number;
    bathrooms: number;
    areaSize: number;
    status: 'available' | 'sold' | 'pending';
    description: string;
    features: string[];
    images: string[];
    createdAt: string;
    updatedAt: string;
}

export const mockProperties: MockProperty[] = [
    {
        id: '1',
        name: 'Luxury Villa in Palm Hills',
        type: 'Villa',
        typeId: '1',
        area: 'New Cairo',
        areaId: '1',
        compound: 'Palm Hills',
        compoundId: '1',
        developer: 'Palm Hills Development',
        developerId: '1',
        address: 'Plot 45, Street 12',
        city: 'Cairo',
        developerPrice: 15000000,
        resalePrice: 17500000,
        bedrooms: 5,
        bathrooms: 4,
        areaSize: 450,
        status: 'available',
        description: 'Stunning 5-bedroom villa with private garden and pool in the prestigious Palm Hills compound.',
        features: ['Swimming Pool', 'Garden', 'Smart Home', 'Parking', 'Security'],
        images: [],
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
    },
    {
        id: '2',
        name: 'Modern Apartment in Madinaty',
        type: 'Apartment',
        typeId: '2',
        area: 'New Cairo',
        areaId: '1',
        compound: 'Madinaty',
        compoundId: '2',
        developer: 'Talaat Moustafa Group',
        developerId: '2',
        address: 'Building B7, Unit 302',
        city: 'Cairo',
        developerPrice: 3500000,
        resalePrice: 4200000,
        bedrooms: 3,
        bathrooms: 2,
        areaSize: 165,
        status: 'available',
        description: 'Spacious 3-bedroom apartment with stunning views and modern finishes.',
        features: ['Balcony', 'Parking', 'Security', 'Gym'],
        images: [],
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18',
    },
    {
        id: '3',
        name: 'Townhouse in Mountain View',
        type: 'Townhouse',
        typeId: '3',
        area: '6th of October',
        areaId: '2',
        compound: 'Mountain View October',
        compoundId: '3',
        developer: 'Mountain View',
        developerId: '3',
        address: 'Phase 2, Plot 78',
        city: 'Giza',
        developerPrice: 8500000,
        resalePrice: 9800000,
        bedrooms: 4,
        bathrooms: 3,
        areaSize: 280,
        status: 'pending',
        description: 'Beautiful townhouse with private garden in the heart of Mountain View community.',
        features: ['Garden', 'Roof Terrace', 'Parking', 'Club Access'],
        images: [],
        createdAt: '2024-01-05',
        updatedAt: '2024-01-12',
    },
    {
        id: '4',
        name: 'Studio in Zed East',
        type: 'Studio',
        typeId: '4',
        area: 'New Cairo',
        areaId: '1',
        compound: 'Zed East',
        compoundId: '4',
        developer: 'Ora Developers',
        developerId: '4',
        address: 'Tower A, Unit 1205',
        city: 'Cairo',
        developerPrice: 1800000,
        resalePrice: 2100000,
        bedrooms: 1,
        bathrooms: 1,
        areaSize: 65,
        status: 'sold',
        description: 'Compact studio apartment perfect for young professionals or investors.',
        features: ['City View', 'Concierge', 'Gym', 'Pool'],
        images: [],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-08',
    },
    {
        id: '5',
        name: 'Penthouse in SODIC East',
        type: 'Penthouse',
        typeId: '5',
        area: 'New Heliopolis',
        areaId: '3',
        compound: 'SODIC East',
        compoundId: '5',
        developer: 'SODIC',
        developerId: '5',
        address: 'Tower C, PH-01',
        city: 'Cairo',
        developerPrice: 22000000,
        resalePrice: 25000000,
        bedrooms: 4,
        bathrooms: 4,
        areaSize: 380,
        status: 'available',
        description: 'Luxurious penthouse with panoramic views and private roof terrace.',
        features: ['Roof Terrace', 'Jacuzzi', 'Smart Home', 'Private Elevator', 'Wine Cellar'],
        images: [],
        createdAt: '2024-01-12',
        updatedAt: '2024-01-22',
    },
    {
        id: '6',
        name: 'Duplex in Hyde Park',
        type: 'Duplex',
        typeId: '6',
        area: 'New Cairo',
        areaId: '1',
        compound: 'Hyde Park',
        compoundId: '6',
        developer: 'Hyde Park Developments',
        developerId: '6',
        address: 'Phase 4, Unit D12',
        city: 'Cairo',
        developerPrice: 12000000,
        resalePrice: 14000000,
        bedrooms: 4,
        bathrooms: 3,
        areaSize: 320,
        status: 'available',
        description: 'Elegant duplex with double-height living room and private garden.',
        features: ['Garden', 'Maid Room', 'Storage', 'Covered Parking'],
        images: [],
        createdAt: '2024-01-08',
        updatedAt: '2024-01-15',
    },
    {
        id: '7',
        name: 'Chalet in Marseilia Beach',
        type: 'Chalet',
        typeId: '7',
        area: 'North Coast',
        areaId: '4',
        compound: 'Marseilia Beach 4',
        compoundId: '7',
        developer: 'Marseilia Group',
        developerId: '7',
        address: 'Row 2, Unit 45',
        city: 'Alexandria',
        developerPrice: 4500000,
        resalePrice: 5200000,
        bedrooms: 3,
        bathrooms: 2,
        areaSize: 140,
        status: 'available',
        description: 'Sea-facing chalet with direct beach access in premium location.',
        features: ['Sea View', 'Beach Access', 'Pool', 'Garden'],
        images: [],
        createdAt: '2024-01-03',
        updatedAt: '2024-01-10',
    },
    {
        id: '8',
        name: 'Twin House in Mivida',
        type: 'Twin House',
        typeId: '8',
        area: 'New Cairo',
        areaId: '1',
        compound: 'Mivida',
        compoundId: '8',
        developer: 'Emaar Misr',
        developerId: '8',
        address: 'Phase 5, Plot 112',
        city: 'Cairo',
        developerPrice: 18000000,
        resalePrice: 21000000,
        bedrooms: 5,
        bathrooms: 4,
        areaSize: 400,
        status: 'pending',
        description: 'Spacious twin house with premium finishes in the acclaimed Mivida community.',
        features: ['Private Garden', 'Pool', 'Smart Home', 'Maid Quarters', 'Driver Room'],
        images: [],
        createdAt: '2024-01-06',
        updatedAt: '2024-01-14',
    },
];

// Mock Property Types
export interface MockPropertyType {
    id: string;
    name: string;
    nameAr: string;
}

export const mockPropertyTypes: MockPropertyType[] = [
    { id: '1', name: 'Villa', nameAr: 'فيلا' },
    { id: '2', name: 'Apartment', nameAr: 'شقة' },
    { id: '3', name: 'Townhouse', nameAr: 'تاون هاوس' },
    { id: '4', name: 'Studio', nameAr: 'ستوديو' },
    { id: '5', name: 'Penthouse', nameAr: 'بنتهاوس' },
    { id: '6', name: 'Duplex', nameAr: 'دوبلكس' },
    { id: '7', name: 'Chalet', nameAr: 'شاليه' },
    { id: '8', name: 'Twin House', nameAr: 'توين هاوس' },
];

// Mock Areas
export interface MockArea {
    id: string;
    name: string;
    nameAr: string;
    propertiesCount: number;
}

export const mockAreas: MockArea[] = [
    { id: '1', name: 'New Cairo', nameAr: 'القاهرة الجديدة', propertiesCount: 1250 },
    { id: '2', name: '6th of October', nameAr: 'السادس من أكتوبر', propertiesCount: 890 },
    { id: '3', name: 'New Heliopolis', nameAr: 'هليوبوليس الجديدة', propertiesCount: 340 },
    { id: '4', name: 'North Coast', nameAr: 'الساحل الشمالي', propertiesCount: 560 },
    { id: '5', name: 'Sheikh Zayed', nameAr: 'الشيخ زايد', propertiesCount: 720 },
    { id: '6', name: 'New Capital', nameAr: 'العاصمة الإدارية', propertiesCount: 480 },
];

// Mock Compounds
export interface MockCompound {
    id: string;
    name: string;
    areaId: string;
    developerId: string;
}

export const mockCompounds: MockCompound[] = [
    { id: '1', name: 'Palm Hills', areaId: '1', developerId: '1' },
    { id: '2', name: 'Madinaty', areaId: '1', developerId: '2' },
    { id: '3', name: 'Mountain View October', areaId: '2', developerId: '3' },
    { id: '4', name: 'Zed East', areaId: '1', developerId: '4' },
    { id: '5', name: 'SODIC East', areaId: '3', developerId: '5' },
    { id: '6', name: 'Hyde Park', areaId: '1', developerId: '6' },
    { id: '7', name: 'Marseilia Beach 4', areaId: '4', developerId: '7' },
    { id: '8', name: 'Mivida', areaId: '1', developerId: '8' },
];

// Mock Developers
export interface MockDeveloper {
    id: string;
    name: string;
    nameAr: string;
}

export const mockDevelopers: MockDeveloper[] = [
    { id: '1', name: 'Palm Hills Development', nameAr: 'بالم هيلز للتعمير' },
    { id: '2', name: 'Talaat Moustafa Group', nameAr: 'مجموعة طلعت مصطفى' },
    { id: '3', name: 'Mountain View', nameAr: 'ماونتن فيو' },
    { id: '4', name: 'Ora Developers', nameAr: 'أورا للتطوير' },
    { id: '5', name: 'SODIC', nameAr: 'سوديك' },
    { id: '6', name: 'Hyde Park Developments', nameAr: 'هايد بارك للتطوير' },
    { id: '7', name: 'Marseilia Group', nameAr: 'مجموعة مرسيليا' },
    { id: '8', name: 'Emaar Misr', nameAr: 'إعمار مصر' },
];

// Helper function to format currency
export function formatCurrency(amount: number, locale: string = 'en'): string {
    if (locale === 'ar') {
        return new Intl.NumberFormat('ar-EG', {
            style: 'currency',
            currency: 'EGP',
            maximumFractionDigits: 0,
        }).format(amount);
    }
    return new Intl.NumberFormat('en-EG', {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0,
    }).format(amount);
}

// Get property by ID
export function getPropertyById(id: string): MockProperty | undefined {
    return mockProperties.find(p => p.id === id);
}
