import React, {useCallback, useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {commonStyles} from '../../constants/commonStyles';
import {I18n} from 'aws-amplify';
import {CustomUtils} from '../../utils/CustomConstans';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {StackNavigationProp} from '@react-navigation/stack';
import AppContext from '../../context/App/AppContext';
import useProducts from '../../hooks/products/useProducts';
import {
  HeaderApp,
  StyledButton,
  StyledTextInput,
} from '../../utils/CustomExports';
import {MainStackNavigator} from '../../navigation/AppNavigation.d';
import {ProdutDetailProps} from '../../navigation/AppNavigation.d';
import { FinancialProductType } from '../../interface/Product';
type AddProductProps = {
  navigation?: StackNavigationProp<MainStackNavigator, 'ProductFormScreen'>;
  route?: {
    params: ProdutDetailProps;
  };
};
const ProductFormScreen: React.FC<AddProductProps> = ({navigation, route}) => {
  const {financialProduct} = route?.params || {};
  const {handleUpdateProduct, isLoading, setIsLoading, handleCreateProduct} =
    useProducts({
      loadInitialProducts: false,
    });

  const {errorShowHandler, handeReloadProductsTag} = useContext(AppContext);
  useEffect(() => {}, []);
  const onSubmitForm = useCallback(
    async (values: FinancialProductType) => {
      try {
        setIsLoading(true);
        if (financialProduct) {
          await handleUpdateProduct(values);
        } else {
          await handleCreateProduct(values);
        }
        handeReloadProductsTag(true);
        navigation?.navigate('ProductListScreen');
      } catch (e: ErrorCatch) {
        errorShowHandler(I18n.get(e?.message));
      } finally {
        setIsLoading(false);
      }
    },
    [financialProduct],
  );
  return (
    <SafeAreaView style={commonStyles.screenContainer}>
      <HeaderApp />
      <Formik
        initialValues={{
          ...{
            id: '',
            name: '',
            description: '',
            logo: '',
            date_release: '',
            date_revision: '',
          },
          ...(financialProduct
            ? {
                ...financialProduct,
                date_release: CustomUtils.formatDate(
                  financialProduct?.date_release,
                ),
                date_revision: CustomUtils.formatDate(
                  financialProduct?.date_revision,
                ),
              }
            : {}),
        }}
        onSubmit={onSubmitForm}
        enableReinitialize={!!financialProduct}
        validateOnChange={true}
        validationSchema={Yup.object().shape({
          id: Yup.string()
            .required('FIELD_REQUIRED')
            .min(3, 'INVALID_ID')
            .max(10, 'INVALID_ID'),
          name: Yup.string()
            .required('FIELD_REQUIRED')
            .min(5, 'INVALID_NAME')
            .max(100, 'INVALID_NAME'),
          description: Yup.string()
            .required('FIELD_REQUIRED')
            .min(5, 'INVALID_NAME')
            .max(100, 'INVALID_NAME'),
          logo: Yup.string().required('FIELD_REQUIRED'),
          date_release: Yup.string()
            .required('FIELD_REQUIRED')
            .test('INVALID_DELIVERY_DATE', 'INVALID_DELIVERY_DATE', value => {
              if (!CustomUtils.isValidDate(value || '')) return false;
              if (!CustomUtils.isDateGreaterEqualThan(new Date(value)))
                return false;
              return true;
            }),
          date_revision: Yup.date().required('FIELD_REQUIRED'),
        })}>
        {({
          values,
          errors,
          setFieldValue,
          touched,
          setFieldTouched,
          resetForm,
          submitForm,
        }) => (
          <ScrollView
            accessible={true}
            accessibilityRole="scrollbar"
            accessibilityLabel={`Formulario para ${
              financialProduct
                ? 'editar el producto selecionado'
                : 'agregar un nuevo producto '
            } en el sistema`}
            style={commonStyles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <Text style={style.title}>{I18n.get('REGISTER_FORM')}</Text>
            <StyledTextInput
              testID="product-id-text-input"
              accessibilityHint="Caja de texto para ingresar el id del producto"
              label={I18n.get('ID')}
              error={errors.id && touched.id ? errors.id : null}
              value={values.id}
              onChangeText={value => {
                setFieldTouched('id', true);
                setFieldValue('id', value);
              }}
              editable={!financialProduct}
            />
            <StyledTextInput
              testID="product-name-text-input"
              accessibilityHint="Caja de texto para ingresar el nombre del producto"
              label={I18n.get('NAME')}
              error={errors.name && touched.name ? errors.name : null}
              value={values.name}
              onChangeText={value => {
                setFieldTouched('name', true);
                setFieldValue('name', value);
              }}
            />
            <StyledTextInput
              testID="product-description-text-input"
              accessibilityHint="Caja de texto para ingresar la descripción del producto"
              label={I18n.get('DESCRIPTION')}
              error={
                errors.description && touched.description
                  ? errors.description
                  : null
              }
              value={values.description}
              onChangeText={value => {
                setFieldTouched('description', true);
                setFieldValue('description', value);
              }}
            />
            <StyledTextInput
              testID="product-logo-text-input"
              accessibilityHint="Caja de texto para ingresar el link de la imágen del producto"
              label={I18n.get('LOGO')}
              error={errors.logo && touched.logo ? errors.logo : null}
              value={values.logo}
              maxLength={500}
              placeholder="https://wwww...file.png"
              onChangeText={value => {
                setFieldTouched('logo', true);
                setFieldValue('logo', value);
              }}
            />
            <StyledTextInput
              testID="product-delivery-date-text-input"
              accessibilityHint="Caja de texto para ingresar la fecha de liberación del producto"
              label={I18n.get('DELIVERY_DATE')}
              error={
                errors.date_release && touched.date_release
                  ? errors.date_release
                  : null
              }
              value={values.date_release}
              placeholder="YYYY-MM-DD"
              keyboardType="number-pad"
              onChangeText={value => {
                setFieldTouched('date_release', true);
                setFieldValue('date_release', value);
                setTimeout(() => {
                  if (CustomUtils.isValidDate(value)) {
                    setFieldValue(
                      'date_revision',
                      CustomUtils.formatDate(
                        CustomUtils.increaseYearsToDate(value, 1),
                      ),
                    );
                  }
                }, 300);
              }}
            />
            <StyledTextInput
              testID="product-revision-date-text-input"
              accessibilityHint="Caja de texto para ingresar la fecha de revisión del producto, este campo se autocompleta al ingresar la fecha de liberación"
              label={I18n.get('REVISION_DATE')}
              error={
                errors.date_revision && touched.date_revision
                  ? errors.date_revision
                  : null
              }
              editable={false}
              keyboardType="number-pad"
              value={values.date_revision}
              placeholder="YYYY-MM-DD"
              onChangeText={value => {
                setFieldTouched('date_revision', true);
                setFieldValue('date_revision', value);
              }}
            />
            <View style={style.buttonContainer}>
              <StyledButton
                testID="submit-form-button"
                accessibilityHint={`Botón para ${
                  financialProduct ? 'editar' : 'guardar'
                } el producto en el sistema`}
                title={I18n.get('SEND')}
                onPress={submitForm}
                isLoading={isLoading}
                disabled={isLoading}
              />
              <StyledButton
                testID="reset-form-button"
                accessibilityHint={`Botón para limpiar el formulario`}
                title={I18n.get('RESET')}
                type="secondary"
                onPress={() => resetForm()}
                disabled={isLoading}
              />
            </View>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};
export default ProductFormScreen;
const style = StyleSheet.create({
  title: {fontWeight: 'bold', fontSize: CustomUtils.getPxH(3)},
  buttonContainer: {
    marginVertical: 25,
    marginBottom: 40,
  },
});
