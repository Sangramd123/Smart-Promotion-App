import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useForm, Controller } from 'react-hook-form';

const vendorFields = [
    { name: 'first_name', label: 'First Name' },
    { name: 'last_name', label: 'Last Name' },
    { name: 'email', label: 'Email' },
    { name: 'address', label: 'Address' },
    { name: 'contact_no', label: 'Contact No' },
    { name: 'password', label: 'Password' },
    { name: 'business_name', label: 'Business Name' },
    { name: 'business_type', label: 'Business Type' },
    { name: 'business_email', label: 'Business Email' },
    { name: 'business_contact', label: 'Business Contact' },
    { name: 'business_address', label: 'Business Address' },
    { name: 'gst_number', label: 'GST Number' },
    { name: 'website', label: 'Website' },
];

const agentFields = [
    { name: 'first_name', label: 'First Name' },
    { name: 'last_name', label: 'Last Name' },
    { name: 'email', label: 'Email' },
    { name: 'address', label: 'Address' },
    { name: 'contact_no', label: 'Contact No' },
    { name: 'password', label: 'Password' },
    { name: 'vendor_id', label: 'Vendor ID' },
];

export default function ProfileScreen({ navigation }) {
    const [userType, setUserType] = useState(null);
    const [fields, setFields] = useState([]);
    const [profilePic, setProfilePic] = useState(null);

    const { control, handleSubmit, reset } = useForm();

    useEffect(() => {
        const init = async () => {
            const type = await AsyncStorage.getItem('user_type'); // 'vendor' or 'agent'
            setUserType(type);

            if (type === 'vendor') {
                setFields(vendorFields);
                reset({
                    first_name: 'Vendor',
                    last_name: 'User',
                    email: 'vendor@example.com',
                    address: 'Vendor Lane',
                    contact_no: '9876543210',
                    password: '',
                    business_name: 'Vendor Co.',
                    business_type: 'Retail',
                    business_email: 'biz@vendor.com',
                    business_contact: '1234567890',
                    business_address: '123 Vendor Street',
                    gst_number: 'GST1234567',
                    website: 'https://vendor.com',
                });
            } else {
                setFields(agentFields);
                reset({
                    first_name: 'Agent',
                    last_name: 'User',
                    email: 'agent@example.com',
                    address: 'Agent Area',
                    contact_no: '9123456789',
                    password: '',
                    vendor_id: 'VENDOR456',
                });
            }
        };

        init();
    }, []);

    const handleSelectImage = () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 0.7 },
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    setProfilePic(response.assets[0].uri);
                }
            }
        );
    };

    const onSubmit = (data) => {
        Alert.alert('Profile Saved', `${userType.toUpperCase()} data saved successfully!`);
        console.log('Submitted Profile:', data);
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView className="px-5 py-2" contentContainerStyle={{ paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
                    <Text className="text-3xl font-bold text-white mb-3 text-center">Profile ({userType})</Text>

                    {/* Header and Profile Pic */}
                    <View className="relative mb-8">
                        <ImageBackground source={require('../assets/header-bg.jpg')} resizeMode="cover" className="h-44 w-full rounded-b-3xl overflow-hidden">
                            <View className="flex-1 bg-black/30 rounded-b-3xl" />
                        </ImageBackground>

                        <View className="absolute top-28 left-1/2 -ml-12">
                            <TouchableOpacity
                                onPress={handleSelectImage}
                                className="w-24 h-24 rounded-full bg-gray-700 border-4 border-black justify-center items-center overflow-hidden"
                            >
                                {profilePic ? (
                                    <Image source={{ uri: profilePic }} className="w-full h-full rounded-full" />
                                ) : (
                                    <Text className="text-gray-400 text-sm">Upload</Text>
                                )}
                                <View className="absolute bottom-1 right-1 bg-white p-1 rounded-full border border-black">
                                    <Camera size={16} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Form Inputs */}
                    {fields.map(({ name, label }) => (
                        <Controller
                            key={name}
                            control={control}
                            name={name}
                            rules={{ required: `${label} is required` }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <View className="mb-4 mx-3">
                                    <Text className="text-gray-300 mb-1">{label}</Text>
                                    <TextInput
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder={`Enter ${label.toLowerCase()}`}
                                        placeholderTextColor="#9ca3af"
                                        secureTextEntry={name === 'password'}
                                        className={`px-4 py-2 rounded-xl bg-gray-800 text-white border ${error ? 'border-red-500' : 'border-gray-700'}`}
                                    />
                                    {error && <Text className="text-red-500 text-xs mt-1">{error.message}</Text>}
                                </View>
                            )}
                        />
                    ))}

                    {/* Save */}
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} className="mt-6 bg-white border border-white rounded-xl py-3 mb-6">
                        <Text className="text-black text-center font-semibold">Save Profile</Text>
                    </TouchableOpacity>

                    {/* Change Password */}
                    <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} className="bg-white border border-white rounded-xl py-3 mb-6">
                        <Text className="text-black text-center font-semibold">Change Password</Text>
                    </TouchableOpacity>

                    {/* Logout */}
                    <TouchableOpacity
                        onPress={() =>
                            Alert.alert('Logout', 'Are you sure you want to logout?', [
                                { text: 'Cancel', style: 'cancel' },
                                {
                                    text: 'Logout',
                                    style: 'destructive',
                                    onPress: async () => {
                                        await AsyncStorage.multiRemove(['token', 'user_type', 'user_id']);
                                        navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
                                    },
                                },
                            ])
                        }
                        className="bg-black border border-white rounded-xl py-3 mb-6"
                    >
                        <Text className="text-white text-center font-semibold">Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}