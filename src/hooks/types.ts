import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: {};
  ProductDetail: {};
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
