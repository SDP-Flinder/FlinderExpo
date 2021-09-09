import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Formik } from "formik";
import * as EmailValidator from "email-validator"; // used when validating with a self-implemented approach
import * as yup from "yup"; // used when validating with a pre-built solution

const FormSchema = yup.object({
    username: yup.string()
    .required('Required!')
    .min(6, 'Too Short! > 5')
    .max(50, 'Too Long! < 51'),
    password: yup.string()
    .required('Required!')
    .min(10, 'Too Short! > 9')
    .max(50, 'Too Long! < 51'),
    firstname: yup.string()
    .required('Required!')
    .min(6, 'Too Short! < 5')
    .max(50, 'Too Long! < 51'),
    lastname: yup.string()
    .required('Required!')
    .min(6, 'Too Short! > 5')
    .max(50, 'Too Long! < 51'),
})


export default function SignUpForm({ setFormData }) {

    return (
        <View> 
            <Formik
                initialValues={{ username: '', password: '', firstname: '', lastname: '' }}
                onSubmit={(values) => {
                    actions.resetForm();
                    setFormData(values);
                }}
            >
            {(props) => {
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={props.handleChange('username')}
                        value={props.values.username}
                        autoCapitalize='none'
                        placeholder="Username" 
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={props.handleChange('password')}
                        value={props.values.password}
                        autoCapitalize='none'
                        placeholder="Password"
                        secureTextEntry
                    />
                    <Field name="firstName" />
                    {errors.firstName && touched.firstName ? (
                        <Text style={styles.error}>{errors.firstName}</Text>
                    ) : null}
                    <Field name="lastName" />
                    {errors.lastName && touched.lastName ? (
                        <Text style={styles.error}>{errors.lastName}</Text>
                    ) : null}
                </View>
            }}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    color: red,
  }
});
