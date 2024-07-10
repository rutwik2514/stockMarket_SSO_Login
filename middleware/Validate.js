import express from 'express'

let regexemail= /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/

export const validemail=(value)=>{
 return  regexemail.test(value);
}