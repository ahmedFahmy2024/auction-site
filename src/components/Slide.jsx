import { Stack } from '@mui/material';
import '../css/slide.css';
import ContainedBtn from './buttons/ContainedBtn';
import OutlineBtn from './buttons/OutlineBtn';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LocalContext } from '../contexts/LocalContext';

export default function Slide({header, parg, title1, title2, pLeft, pRight, firstBtnNav, secBtnNav, width}) {
    const navigate = useNavigate();
    const { locale, setLocale } = useContext(LocalContext);

    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "slide"].join(" ")} >
            <div className='center-content' style={{paddingLeft: pLeft ? pLeft : '10%', paddingRight: pRight ? pRight : '24%'}}>
                <div className='content-text'>
                    <h3>{header}</h3>
                    <p>{parg}</p>
                    <Stack sx={{ width: '100%', justifyContent: { xs: 'center', md: 'flex-start'} }} direction="row" spacing={2}>
                        {title1 === null ? null : <ContainedBtn width={width} title={title1} onClick={() => navigate(firstBtnNav)} /> }
                        {title2 && <OutlineBtn bgColor='white' title={title2} onClick={() => navigate(secBtnNav)} /> }
                    </Stack>
                </div>
            </div>
        </div>
    )
}
