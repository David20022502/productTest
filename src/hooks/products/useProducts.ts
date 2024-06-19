import {useCallback, useEffect, useMemo, useState} from 'react';
import {I18n} from 'aws-amplify';
import {productService} from '../../services/product/ProductService';
import {FinancialProductType} from '../../interface/Product';
const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<FinancialProductType[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<
    FinancialProductType[]
  >([]);
  const [isSearcing, setIsSearcing] = useState(false);
  const [error, setError] = useState();
  const finalProducts = useMemo(() => {
    return isSearcing ? searchedProducts : products;
  }, [isSearcing, searchedProducts, products]);
  useEffect(() => {
    handleGetProducts();
  }, []);
  const handleGetProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setProducts(await productService.getProducts());
    } catch (e: ErrorCatch) {
      setError(e?.message || I18n.get('AN_ERROR_OCCURRED'));
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleSearchProduct = useCallback(
    async (searchKey: String) => {
      try {
        setIsSearcing(true);
        setIsLoading(true);
        setSearchedProducts(
          products.filter(item =>
            item.name
              .toLocaleLowerCase()
              .includes(searchKey.toLocaleLowerCase()),
          ),
        );
      } catch (e: ErrorCatch) {
        setError(e?.message || I18n.get('AN_ERROR_OCCURRED'));
      } finally {
        setIsLoading(false);
      }
    },
    [products],
  );
  const handleReloadProducts = () => {
    setError(undefined);
    handleGetProducts();
  };
  const handleCancelSearch = () => {
    setIsSearcing(false);
    setSearchedProducts([]);
  };
  return {
    isLoading,
    products: finalProducts,
    error,
    handleCancelSearch,
    handleGetProducts,
    handleReloadProducts,
    handleSearchProduct,
  };
};
export default useProducts;
