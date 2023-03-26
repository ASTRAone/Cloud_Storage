import { PropsWithChildren, forwardRef, ForwardedRef, ComponentPropsWithRef } from 'react';
import { useForm, FormProvider, UseFormReturn, ValidationMode, FieldValues } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
  onSubmit?: (values: any) => void;
  defaultValues?: any;
  mode?: keyof ValidationMode;
  formMethods?: UseFormReturn<T>;
};
type Props<T extends FieldValues> = Omit<ComponentPropsWithRef<'form'>, keyof FormProps<T>> &
  PropsWithChildren<FormProps<T>>;

const FormInner = <T extends FieldValues>(props: Props<T>, ref?: ForwardedRef<HTMLFormElement>) => {
  const { onSubmit, children, defaultValues, formMethods, mode = 'onBlur', ...restProps } = props;
  const methods = formMethods ?? useForm<T>({ defaultValues, mode });

  return (
    <FormProvider {...methods}>
      <form
        {...restProps}
        onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
        ref={ref}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export const Form = forwardRef(FormInner) as <T extends FieldValues>(
  props: Props<T> & { ref?: ForwardedRef<HTMLFormElement> },
) => ReturnType<typeof FormInner>;
