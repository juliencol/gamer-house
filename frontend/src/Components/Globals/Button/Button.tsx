import './Button.css';

interface propsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'submit' | 'reset' | 'button';
  display: 'Primary' | 'Ghost';
}

function Button(props: propsButton) {
  return <button className={`Button ${props.display}`} {...props} />;
}

export default Button;
