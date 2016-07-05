/**
 * Created by weimeng on 16/6/6.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


export function format_currency( n ) {
  return Number(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}