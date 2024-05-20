"use client"

import React, {useState, useEffect} from 'react';
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import {
  BsHouse,
  BsReceipt,
  BsGraphUp,
  BsBox,
  BsGear,
  BsBoxArrowLeft,
  BsBell,
  BsPersonCircle,
  BsArrowUpRight,
  BsArrowDownRight,
  BsChevronDown
} from 'react-icons/bs'

export default function Home() {

  interface Transaction{
    formattedAmount: string,
    reference: string,
    date: string,
    type: 'inward' | 'outward',
    amount: number
  }

  const [transactions, setTransaction] = useState<Transaction[]>([])
  const [filterBy, setFilterBy] = useState<string>('daily')
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [totalInwardAmount, setTotalInwardAmount] = useState<number>(0)
  const [totalOutwardAmount, setTotalOutwardAmount] = useState<number>(0)
  interface RECEIVER_TYPE{
    name: string
  };

  const receivers : RECEIVER_TYPE [] = [
    {name: 'Felix Vincent'},
    {name: 'Jonah Musa'},
    {name: 'Jide Taiwo'},
    {name: 'Faith M'}
  ];

  type FilterBy = 'daily' | 'monthly' | 'yearly';

  
  const transactionsData : Transaction [] = [
    {formattedAmount: '10,000.00', amount: 10000, reference: '007', date: moment().format('DD/MM/YY'), type: 'inward'},
    {formattedAmount: '15,000.00', amount: 15000, reference: '006', date: moment().format('DD/MM/YY'), type: 'outward'},
    {formattedAmount: '20,000.00', amount: 20000, reference: '005', date: '18/05/24', type: 'outward'},
    {formattedAmount: '1,000.00', amount: 1000, reference: '004', date: '17/05/24', type: 'inward'},
    {formattedAmount: '25,000.00', amount: 25000, reference: '003', date: '15/05/24', type: 'inward'},
    {formattedAmount: '50,000.00', amount: 50000, reference: '002', date: '15/02/24', type: 'outward'},
    {formattedAmount: '5,000.00', amount: 5000, reference: '001', date: '25/01/24', type: 'inward'}
  ];

  type onFilterByProp = (event: React.ChangeEvent<HTMLSelectElement>) => void

  const onFilterBy : onFilterByProp = (event) => {
    const selectedCriteria = event.target.value as FilterBy;
    setFilterBy(selectedCriteria);
    calculateMetric();
    allFilteredTransactions();
    
};

  type Filter = () => void

  const allFilteredTransactions : Filter = () => {

    const now = moment();

    const filteredTransactions : Transaction [] = transactionsData.filter(transaction => {
      const transactionDate = moment(transaction.date, 'DD/MM/YY');

        switch (filterBy) {
            case 'daily':
                return transactionDate.isSame(now, 'day');
            case 'monthly':
                return transactionDate.isSame(now, 'month');
            case 'yearly':
                return transactionDate.isSame(now, 'year');
            default:
                return true;
        }
    });

    setTransaction(filteredTransactions)
  }

  
  type CalculateMetric = () => void
  const calculateMetric : CalculateMetric = () => {
    let totalAmount = 0;
    let totalInwardAmount = 0;
    let totalOutwardAmount = 0;
    transactions.map(transaction => totalAmount += transaction.amount);
    transactions.filter(transaction => transaction.type === 'inward').map(transaction => totalInwardAmount += transaction.amount);
    transactions.filter(transaction => transaction.type === 'outward').map(transaction => totalOutwardAmount += transaction.amount);
    setTotalAmount(totalAmount);
    setTotalInwardAmount(totalInwardAmount);
    setTotalOutwardAmount(totalOutwardAmount);
  }

  useEffect(() => {
    allFilteredTransactions();
    calculateMetric()
  }, [transactions]);

  
  type numberWithCommasProp = (input:string) => string
  const numberWithCommas : numberWithCommasProp = (input) => {
    let number = parseFloat(input);
  
    let hasDecimal = input.toString().split('').indexOf('.') !== -1;

    if (!hasDecimal) {
      input += '.00';
      number = parseFloat(input);
    }
  
    let parts = input.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return parts.join('.');
  }

  return (
    <div className="md:flex gap-4 p-5 min-h-screen">
      <div className="w-1/5 hidden md:inline bg-white rounded-lg shadow-sm py-4 min-h-screen relative text-[16px]">
          <div className="text-gray-900 px-4 font-bold">
            Cashir
          </div>
          {/* Menu  */}
          <div className="grid grid-cols-1 gap-3 mt-5 px-4">
            <Link href={'/'} className="text-gray-900 bg-blue-100 p-4 rounded-lg flex space-x-2 font-bold items-center">
                <span>
                    <BsHouse/>
                </span>
                <span>Home</span>
            </Link>
            <Link href={'#'} className="text-gray-900 p-4 rounded-lg flex space-x-2 hover:bg-blue-100 font-light items-center">
                <span><BsReceipt/></span>
                <span>Transactions</span>
            </Link>
            <Link href={'#'} className="text-gray-900 p-4 rounded-lg flex space-x-2 hover:bg-blue-100 font-light items-center">
                <span><BsGraphUp/></span>
                <span>Analytics</span>
            </Link>
            <Link href={'#'} className="text-gray-900 p-4 rounded-lg flex space-x-2 hover:bg-blue-100 font-light items-center">
                <span><BsBox/></span>
                <span>Products</span>
            </Link>
          </div>
          <div className="absolute bottom-10 w-full px-4">
            <div className="grid grid-cols-1 gap-3">
              <Link href={'#'} className="text-gray-900 p-4 rounded-lg flex space-x-2 hover:bg-blue-100 font-light items-center">
                  <span><BsGear/></span>
                  <span>Settings</span>
              </Link>
              <Link href={'#'} className="text-red-600 p-4 rounded-lg flex space-x-2 hover:bg-blue-100 font-light items-center">
                  <span><BsBoxArrowLeft/></span>
                  <span>Log out</span>
              </Link>
            </div>
          </div>
          {/* Menu  */}
      </div>
      <div className="md:w-4/5">
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
            <div className="text-gray-900 text-sm">Hello, <strong>Olumayokun</strong></div>
            <div className="flex space-x-3 items-center">
                <div className="bg-gray-200 w-5 h-5 p-5 flex justify-center items-center rounded-[10px] text-gray-900 cursor-pointer">
                  <span><BsBell/></span>
                </div>
                <div className="text-gray-200">|</div>
                <div className="flex space-x-2">
                  <div className="bg-green-500 w-5 h-5 p-5 flex justify-center items-center rounded-[10px] text-white">
                    <span><BsPersonCircle/></span>
                  </div>
                  <div>
                      <h2 className="text-gray-900 text-[14px] font-light">Olumayokun</h2>
                      <h2 className="text-gray-500 text-[12px] font-light">ID:11010101</h2>
                  </div>
                </div>
            </div>
        </div>
        <div className='mt-5'>
            <label className='text-gray-900 px-3 font-light text-sm py-2 rounded-full border w-[100px] h-[35px] bg-white relative flex items-center cursor-pointer'>
              <select value={filterBy} onChange={onFilterBy}
                      className='border-none appearance-none bg-transparent outline-none capitalize cursor-pointer absolute w-full h-full'>
                  <option>all</option>
                  <option value={'daily'}>daily</option>
                  <option value={'monthly'}>monthly</option>
                  <option value={'yearly'}>yearly</option>
              </select>
              <div className='text-gray-900 absolute right-2'><BsChevronDown/></div>
            </label>
        </div>
        <div className="md:flex gap-4 mt-5 space-y-5 md:space-y-0">
          <div className="md:w-2/3 grid-cols-1 grid gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="mb-3">
                  <h3 className="text-gray-900 font-bold text-sm">Total amount</h3>
                </div>
                <h3 className="font-light text-gray-900 text-[1.5em] mb-1">
                  ₦{numberWithCommas(`${totalAmount}`)}
                </h3>
                <p className="text-gray-900 text-[11px] font-light">Inward ₦50,000.00 this month</p>
            </div>
            <div className="md:flex gap-4 space-y-5 md:space-y-0">
              <div className="bg-white rounded-lg shadow-sm p-4 md:w-1/2 flex items-center h-fit">
                <div>
                <div className="mb-3">
                    <h3 className="text-gray-900 font-bold text-sm">Total inward</h3>
                  </div>
                  <h3 className="font-light text-gray-900 text-[1.5em] mb-1">
                    ₦{numberWithCommas(`${totalInwardAmount}`)}
                  </h3>
                  <p className="text-gray-900 text-[11px] font-light">5% increased this week</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 md:w-1/2 flex items-center h-fit">
                <div>
                <div className="mb-3">
                    <h3 className="text-gray-900 font-bold text-sm">Total outward</h3>
                  </div>
                  <h3 className="font-light text-gray-900 text-[1.5em] mb-1">
                    ₦{numberWithCommas(`${totalOutwardAmount}`)}
                  </h3>
                  <p className="text-gray-900 text-[11px] font-light">25% increased this week</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 text-gray-900">
                <h3 className="text-gray-900 font-bold text-sm">Recent transactions</h3>
                <table className="table-auto w-full mt-5">
                      <thead>
                        <tr className="text-gray-500 font-light text-[13px]">
                            <td>#</td>
                            <td>Reference</td>
                            <td>Amount</td>
                            <td className="text-center">Type</td>
                            <td>Date</td>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction, index)=>(
                          <tr key={index} className="border-t text-sm font-light">
                          <td className="items-center">{index+1}</td>
                          <td className="items-center">{transaction.reference}</td>
                          <td className="h-[3em] items-center flex">₦{transaction.formattedAmount}</td>
                          <td className="h-[3em] items-center justify-center text-center">
                            <div className={`w-[5em] p-1 flex items-center justify-center m-auto rounded-lg text-white
                                  ${transaction.type === 'outward' ? 'bg-red-500' : 'bg-green-500'}`}>
                              {transaction.type === 'outward' ? (<BsArrowUpRight/>) : (<BsArrowDownRight/>)}
                            </div>
                          </td>
                          <td className="items-center">{transaction.date}</td>
                      </tr>
                        ))}
                      </tbody>
                  </table>
            </div>
          </div>
          <div className="md:w-1/3 grid-cols-1 grid gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4 h-fit">
                <h3 className="text-gray-900 font-bold text-sm">Top receivers</h3>
                <div className="mt-5 grid grid-cols-1 gap-4">
                  {receivers.map((receiver, index)=>(
                    <div key={index} className="text-gray-900 bg-gray-200 p-3 rounded-lg">
                    <h3 className="text-[15px] font-light">{receiver.name}</h3>
                  </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
