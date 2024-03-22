import { StyleSheet } from "react-native";
import {COLORS, SIZES, FONT} from '../../constants';

const styles = StyleSheet.create({

    containerShown:{position: 'absolute', bottom:0, right:"2vw", zIndex:999},
    containerHide:{display:"none"},
    listItems:{display: "flex", flexDirection: "row", backgroundColor:COLORS.secondary},
    icons:{padding: "4vw", color:COLORS.secondarylight},
    iconPressed:{backgroundColor:COLORS.tertiary,color: COLORS.secondary},
    nonPressed:{color: COLORS.secondarylight}


})

export default styles;


