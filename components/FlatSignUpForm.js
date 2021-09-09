
// Address, 

import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {AuthContext} from '../App';
import { Formik } from "formik";
import * as EmailValidator from "email-validator"; // used when validating with a self-implemented approach
import * as yup from "yup"; // used when validating with a pre-built solution

export default function FlatSignUpForm({ setFlatFormData }) {

    return (
        <> 
            <Formik
                initialValues={{ text: '' }}
                onSubmit={(values) => {
                    actions.resetForm();
                    setFlatFormData(values);
                }}
            >
            {(props) => {
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={props.handleChange('text')}
                        value={props.values.text}
                        placeholder="Another TextInput" 
                    />
                </View>
            }}
            </Formik>
        </>
    );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
