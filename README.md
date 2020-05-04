# Project 2 Ravencoin Block Explorer

## Description

Ravencoin is a fork of the Bitcoin cryptocurrency codebase. Therefore, as Ravencoin is a blockchain protocol, it allows viewing of all transactions in its blockchain database. This webapp is built as a viewer of the history of the RVN blockchain data by searching for:

- Block by height or hash
- Transaction hash
- Address
- Asset

In addition to being a project of personal interest, this web app fulfills the first project requirement for the [General Assembly Software Immersive Engineer Remote course](https://generalassemb.ly/education/software-engineering-immersive-remote).

## Structure

This web app explores the blockchain through two main methods:

- Latest blocks, transactions, or randomly listed assets
- Search for block, transaction, or asset

## Technologies Used

Tools used in this project so far are those covered in the first six weeks of the GA SEIR course.

- React
- API
- HTML5
- CSS
- Javascript

## Approach

I've approached this coding challenge using React and React router to navigate the data contained in the RVN blockchain.

There are five main views of the data:

- Latest running blocks and transactions on the landing page which links to detail for each
- Block detail (searchable by block height or hash) listing all contained transactions along with input & output address and RVN amounts
- Address detail (searchable by address) listing all relevant transactions along with input & output address and RVN amounts
- Transaction detail (searchable by transaction hash) listing all input & output addresses as well as link to the containing block
- Asset detail (searchable by asset name) containing summary information about the asset as well a link to the originating block

## Incomplete Items

A few things that bug me:

- Asset transfers are not included in the transactional detail
- Asset detail doesn't list holding addresses or transactions - this will require updating of the API
- It is all text and not very fun to look at
- I'm using DOM manipulation outside of React in one place to load a 3rd party socket script
- There's a lurking bug that generates an error on page load about 10% of the time

In general I like the size of this project at this point because it has me thinking about larger-scale organization for easier maintenance and troubleshooting.

## Installation

Use this app by visiting its hosted site [here](https://trental.github.io/Project-2-Ravencoin-Block-Explorer) at github or by cloning the [repository](https://github.com/trental/Project-2-Ravencoin-Block-Explorer.git) and running it yourself.

## Contribution Guidelines

Suggestions and contributions to this code are welcome! Please submit issues or pull-requests for errors or desired code enhancements!
