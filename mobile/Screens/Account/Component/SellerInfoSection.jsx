import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';


export default function SellerInfoSection({ styles, editable, location, data }) {
    const selectProvince = (val) => {
        if (val === location.province) {
            return;
        }
        const newDis = data.districts[val][0].key;
        const newWard = data.wards[newDis][0].key;

        location.setProvince(val);
        location.setDistrict(newDis);
        location.setWard(newWard);
    }

    const selectDistrict = (val) => {
        if (val === location.district) {
            return;
        }
        const newWard = data.wards[val][0].key;

        location.setDistrict(val);
        location.setWard(newWard)
    }

    const selectWard = (val) => {
        if (val === location.ward) {
            return;
        }
        location.setWard(val);
    }

    const onChangeAddress = (val) => {
        location.setAddress(val);
    }


    return (
        <>
            <View style={styles.addVerticalSpace}></View>
            <View style={styles.divider}></View>
            <Text style={styles.h1}>Thông tin người bán</Text>

            <Text style={styles.text}>Tỉnh/Thành phố</Text>
            <View pointerEvents={editable ? 'auto' : 'none'}>
                <SelectList
                    setSelected={(val) => selectProvince(val)}
                    data={data.provinces}
                    save="key"
                    defaultOption={data.provinces.filter(ele => ele.key == location.province)[0]}
                    boxStyles={sectionStyles.boxInput}
                    dropdownStyles={[sectionStyles.boxInput, { height: 150 }]}
                    inputStyles={[sectionStyles.textInput, !editable ? {color: 'rgba(0, 0, 0, 0.35)'} : {}]}
                    dropdownTextStyles={[sectionStyles.textInput, !editable ? {color: 'rgba(0, 0, 0, 0.35)'} : {}]}
                />
            </View>

            <Text style={styles.text}>Quận/Huyện/Thị xã</Text>
            <View pointerEvents={editable && (location.province !== "0") ? 'auto' : 'none'}>
                <SelectList
                    setSelected={(val) => selectDistrict(val)}
                    data={data.districts[location.province]}
                    save="key"
                    boxStyles={sectionStyles.boxInput}
                    defaultOption={data.districts[location.province].filter(ele => ele.key == location.district)[0]}
                    dropdownStyles={[sectionStyles.boxInput, { height: 150 }]}
                    inputStyles={[sectionStyles.textInput, !editable ? {color: 'rgba(0, 0, 0, 0.35)'} : {}]}
                    dropdownTextStyles={[sectionStyles.textInput, !editable ? {color: 'rgba(0, 0, 0, 0.35)'} : {}]}
                />
            </View>

            <Text style={styles.text}>Phường/Xã/Thị trấn</Text>
            <View pointerEvents={editable && (location.district != '0') ? 'auto' : 'none'}>
                <SelectList
                    setSelected={(val) => selectWard(val)}
                    data={data.wards[location.district]}
                    save="key"
                    defaultOption={data.wards[location.district].filter(ele => ele.key == location.ward)[0]}
                    boxStyles={sectionStyles.boxInput}
                    dropdownStyles={[sectionStyles.boxInput, { height: 150 }]}
                    inputStyles={[sectionStyles.textInput, !editable ? {color: 'rgba(0, 0, 0, 0.35)'} : {}]}
                    dropdownTextStyles={[sectionStyles.textInput, !editable ? {color: 'rgba(0, 0, 0, 0.35)'} : {}]}
                />
            </View>

            <Text style={styles.text}>Địa chỉ cụ thể</Text>
            <TextInput
                editable={editable}
                value={location.address}
                style={styles.input}
                onChangeText={onChangeAddress}
            />
        </>
    )
}

const sectionStyles = StyleSheet.create({
    boxInput: {
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#E1E1E1',
        height: 48,
        paddingHorizontal: '4%',
        marginHorizontal: 10,
    },
    textInput: {
        fontFamily: 'montserrat-semi-bold',
        fontSize: 14,
    },
})
