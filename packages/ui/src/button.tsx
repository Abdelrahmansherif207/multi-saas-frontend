import { Button as BSButton, ButtonProps } from 'react-bootstrap';

export interface MyButtonProps extends ButtonProps {
    children: React.ReactNode;
}

export const Button = ({ children, ...props }: MyButtonProps) => {
    return (
        <BSButton {...props}>
            {children}
        </BSButton>
    );
};
