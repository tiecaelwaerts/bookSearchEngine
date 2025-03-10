import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation AddUser($input: UserInput!) {
        addUser(input: $input) {
            token
            user {
                _id
                username
            }}`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }}`;

export const SAVE_BOOK = gql`
    mutation SaveBook($input: BookInput!) {
        saveBook(input: $input) {
            _id
            username
            bookCount
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }}}`; 

export const REMOVE_BOOK = gql`
    mutation RemoveBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            bookCount
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }}}`;