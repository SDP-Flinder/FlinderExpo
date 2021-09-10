import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Formik, Form, Field } from "formik";
import * as EmailValidator from "email-validator"; // used when validating with a self-implemented approach
import * as yup from "yup"; // used when validating with a pre-built solution

const formSchema = yup.object({
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
    email: yup.string().email('Invalid email').required('Required!'),
})

export default function SignUpForm({ setFormData }) {
    return (
        <View> 
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                  }}
                validationSchema={formSchema}
                onChangeText={(values) => {
                    actions.resetForm();
                    setFormData(values);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder='Username'
                            onChangeText={props.handleChange('username')}
                            value={props.values.username}
                        />
                        <Text style={styles.error}>{props.touched.username && props.errors.username}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Password'
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                        />
                        <Text style={styles.error}>{props.touched.password && props.errors.password}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='First Name'
                            onChangeText={props.handleChange('firstname')}
                            value={props.values.firstname}
                        />
                        <Text style={styles.error}>{props.touched.firstname && props.errors.firstname}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Last Name'
                            onChangeText={props.handleChange('lastname')}
                            value={props.values.lastname}
                        />
                        <Text style={styles.error}>{props.touched.lastname && props.errors.lastname}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                        />
                        <Text style={styles.error}>{props.touched.email && props.errors.email}</Text>
                    </View>
                    // <Form>
                    //     <Field name="username" placeholder="Username" />
                    //     {errors.username && touched.username ? (
                    //         <Text style={styles.error}>{errors.username}</Text>
                    //     ) : null}
                    //     <Field name="password" type="password" placeholder="Password" />
                    //     {errors.password && touched.password ? (
                    //         <Text style={styles.error}>{errors.password}</Text>
                    //     ) : null}
                    //     <Field name="firstname" placeholder="Firstname" />
                    //     {errors.firstname && touched.firstname ? (
                    //         <Text style={styles.error}>{errors.firstname}</Text>
                    //     ) : null}
                    //     <Field name="lastname" placeholder="Lastname"/>
                    //     {errors.lastname && touched.lastname ? (
                    //         <Text style={styles.error}>{errors.lastname}</Text>
                    //     ) : null}
                    //     <Field name="email" type="email" placeholder="Email"/>
                    //     {errors.email && touched.email ? (
                    //         <Text style={styles.error}>{errors.email}</Text>
                    //     ) : null}
                    // </Form>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 5,
  },
  error: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center'
  }
});
