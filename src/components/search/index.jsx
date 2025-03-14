import * as React from 'react';
import { Box } from '@mui/material';
import useAutocomplete from '@mui/material/useAutocomplete';
import { styled } from '@mui/system';
import Image from 'next/image';

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
];

const Input = styled('input')(({ theme }) => ({
    width: 254,
    backgroundColor: '#f5f5f5',
    borderRadius:2,
    border:"none",
    outline:"none",
    height: 38,
    color: '#000',
    ...theme.applyStyles('dark', {
        backgroundColor: '#000',
        color: '#fff',
    }),
}));

const Listbox = styled('ul')(({ theme }) => ({
    width: 255,
    margin: "5px 0 0 0",
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: '#fff',
    overflow: 'auto',
    maxHeight: 500,
    zIndex:111,
    border: '1px solid rgba(0,0,0,.25)',
    '& li.Mui-focused': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
    },
    '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
    },
    ...theme.applyStyles('dark', {
        backgroundColor: '#000',
    }),
}));

export default function UseAutocomplete() {
    const {
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'search-autocomplete',
        options: top100Films,
        getOptionLabel: (option) => option.title,
    });

    return (
        <StyledSearchSection>
            <StyledSearchImg
                width={20}
                height={20}
                src={'search.svg'}
                alt={'검색'}
            />
            <Input {...getInputProps()} placeholder='콘텐츠, 인물, 컬렉션, 유저, 매거진 검색' />
            
            {groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()}>
                {groupedOptions.map((option, index) => {
                const { key, ...optionProps } = getOptionProps({ option, index });
                return (
                    <li key={key} {...optionProps}>
                        {option.title}
                    </li>
                );
                })}
            </Listbox>
            ) : null}
        </StyledSearchSection>
    );
}

const StyledSearchSection = styled(Box)`
    position:relative;
    background-color:#f5f5f5;
    border-radius:2px;
    padding-left:36px;
`;

const StyledSearchImg = styled(Image)`
    position:absolute;
    top:9px;
    left:8px;
`;
