export interface TStolenBike {
  date_stolen?: number;
  description: string | null;
  frame_colors: string[];
  frame_model: string;
  id: number;
  is_stock_img: boolean;
  large_img: string;
  location_found: string | null;
  manufacturer_name: string;
  external_id?: any;
  registry_name?: any;
  registry_url?: any;
  serial: string;
  status: string;
  stolen: boolean;
  registration_created_at?: number;
  registration_updated_at?: number;
  stolen_coordinates?: number[];
  stolen_location: string;
  thumb: string;
  title: string;
  url: string;
  year?: number;
}

export interface StolenRecord {
  date_stolen: number;
  location: string;
  latitude: number;
  longitude: number;
  theft_description: string;
  locking_description: string;
  lock_defeat_description: string;
  police_report_number: string;
  police_report_department: string;
  created_at: number;
  create_open311: boolean;
  id: number;
}

export interface PublicImage {
  name: string;
  full: string;
  large: string;
  medium: string;
  thumb: string;
  id: number;
}

export interface TBike {
  date_stolen: number;
  description: string | null;
  frame_colors: string[];
  frame_model: string;
  id: number;
  is_stock_img: boolean;
  large_img: string;
  location_found?: any;
  manufacturer_name: string;
  external_id?: any;
  registry_name?: any;
  registry_url?: any;
  serial: string;
  status: string;
  stolen: boolean;
  stolen_coordinates: number[];
  stolen_location: string;
  thumb: string;
  title: string;
  url: string;
  year: number;
  registration_created_at: number;
  registration_updated_at: number;
  api_url: string;
  manufacturer_id: number;
  paint_description?: any;
  name?: any;
  frame_size?: any;
  rear_tire_narrow: boolean;
  front_tire_narrow?: any;
  type_of_cycle: string;
  test_bike: boolean;
  rear_wheel_size_iso_bsd?: any;
  front_wheel_size_iso_bsd?: any;
  handlebar_type_slug?: any;
  frame_material_slug?: any;
  front_gear_type_slug?: any;
  rear_gear_type_slug?: any;
  extra_registration_number?: any;
  additional_registration?: any;
  stolen_record: StolenRecord;
  public_images: PublicImage[];
  components: any[];
}

export interface RootObject {
  bike: TBike;
}

export interface TStolenBikesCount {
  non: number;
  stolen: number;
  proximity: number;
}
