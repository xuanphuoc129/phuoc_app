export class RestaurantCMD {

    public static  CREATE_ACCOUNT : string = "create_account";
	public static  UPDATE_ACCOUNT : string = "update_account";
	public static  GET_ACCOUNT_INFO : string = "get_account_info";
	public static  GET_LIST_ACCOUNT : string = "get_list_account";
	
	public static  GET_LIST_STAFF : string = "get_list_staff";
	public static  GET_STAFF_INFO : string = "get_staff_info";
	public static  ADD_STAFF_INTO_RESTAURANT : string = "add_staff_into_restaurant";
	public static  REMOVE_STAFF_OUT_RESTAURANT : string = "remove_staff_out_restaurant";
	public static  UPDATE_STAFF_ROLE_IN_RESTAURANT : string = "update_staff_role_in_restaurant";
	public static  GET_RESTAURANT_OF_USER : string = "get_restaurant_of_user";
	
	public static  CREATE_RESTAURANT : string = "create_restaurant";
	public static  UPDATE_RESTAURANT_INFO : string = "update_restaurant";
	public static  GET_RESTAURANT_INFO : string = "get_restaurant_info";
	public static  GET_LIST_RESTAURANT : string = "get_list_restaurant";
	public static  BLOCK_RESTAURANT : string = "block_restaurant";
	
	public static  ADD_PRODUCT : string = "add_product";
	public static  GET_PRODUCT_INFO : string = "get_product_info";
	public static  UPDATE_PRODUCT_INFO : string = "update_product_info";
	public static  GET_PRODUCT_IN_RESTAURANT : string = "get_product_in_restaurant";
	
	public static  GET_LIST_CATEGORIES : string = "get_list_categories";
	public static  GET_LIST_CATEGORIES_IN_RESTAURANT : string = "get_list_categories_in_restaurant";
	public static  GET_CATEGORY_INFO : string = "get_category_info";
	public static  CREATE_CATEGORY : string = "create_category";
	public static  UPDATE_CATEGORY_INFO : string = "update_category_info";
	public static  REMOVE_CATEGORY : string = "remove_category";
	
	public static  GET_LIST_AREA : string = "get_list_area";
	public static  GET_LIST_AREA_IN_RESTAURANT : string = "get_list_area_in_restaurant";
	public static  GET_AREA_INFO : string = "get_area_info";
	public static  CREATE_AREA : string = "create_area";
	public static  UPDATE_AREA_INFO : string = "update_area_info";
	public static  REMOVE_AREA : string = "remove_area";
	
	public static  GET_LIST_FLOOR_IN_RESTAURANT : string = "get_list_floor_in_restaurant";
	public static  GET_FLOOR_INFO : string = "get_floor_info";
	public static  CREATE_FLOOR : string = "create_floor";
	public static  UPDATE_FLOOR_INFO : string = "update_floor_info";
	public static  REMOVE_FLOOR : string = "remove_floor";
	
	public static  GET_LIST_TABLE_IN_RESTAURANT : string = "get_list_table_in_restaurant";
	public static  GET_TABLE_INFO : string = "get_table_info";
	public static  CREATE_TABLE : string = "create_table";
	public static  UPDATE_TABLE_INFO : string = "update_table_info";
	public static  REMOVE_TABLE : string = "remove_table";
	
	public static  GET_LIST_ORDER_TODAY : string = "get_list_order_today";
	public static  GET_ORDER_INFO : string = "get_order_info";
	public static  CREATE_ORDER : string = "create_order";
	public static  UPDATE_ORDER_INFO : string = "update_order_info";
	public static  REMOVE_ORDER : string = "remove_order";
	
	public static  ADD_PRODUCT_INTO_ORDER : string = "add_product_into_order";
	public static  GET_PRODUCT_IN_ORDER : string = "get_product_in_order";
	public static  UPDATE_PRODUCT_IN_ORDER : string = "update_product_in_order";
	public static  REMOVE_PRODUCT_IN_ORDER : string = "remove_product_in_order";

	public static  CREATE_SHIFT : string = "create_shift";
	public static  UPDATE_SHIFT_INFO : string = "update_shift_info";
	public static  REMOVE_SHIFT : string = "remove_shift";
	public static  GET_LIST_SHIFT_IN_RESTAURANT : string = "get_list_shift_in_restaurant";
	
	
	public static  GET_DISCOUNT_INFO : string = "get_discount_info";
	public static  CREATE_DISCOUNT : string = "create_discount";
	public static  UPDATE_DISCOUNT_INFO : string = "update_discount_info";
	public static  REMOVE_DISCOUNT : string = "remove_discount";
	public static  GET_LIST_DISCOUNT_IN_RESTAURANT : string = "get_list_discount_in_restaurant";

	public static  GET_VENDOR_LIST = "get_vendor_list";
	public static  GET_RESTAURANT_IN_VENDOR = "get_restaurant_in_vendor";
	public static  GET_VENDOR_INFO = "get_vendor_info";
	public static  CREATE_VENDOR = "create_vendor";
	public static  ADD_RESTAURANT_TO_VENDOR = "add_restaurant_to_vendor";
	public static  REMOVE_VENDOR = "remove_vendor";
	public static  UPDATE_VENDOR = "update_vendor";
	public static  REMOVE_RESTAURANT_OUT_VENDOR = "remove_restaurant_out_vendor";
	
	public static  GET_COMBO_INFO = "get_combo_info";
	public static  CREATE_COMBO = "create_combo";
	public static  UPDATE_COMBO_INFO = "update_combo_info";
	public static  GET_LIST_COMBO_OF_RESTAURANT = "get_list_combo_of_restaurant";
	
	public static  ADD_PRODUCT_INTO_COMBO = "add_product_into_combo";
	public static  REMOVE_PRODUCT_OUT_COMBO = "remove_product_out_combo";
	public static  UPDATE_PRODUCT_IN_COMBO = "update_product_in_combo";
	public static  GET_PRODUCT_IN_COMBO = "get_product_in_combo";
    constructor() { }
}