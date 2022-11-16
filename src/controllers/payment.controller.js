import CardWestern from '../models/card.model.js'
import OwnerWestern from '../models/owner.model.js'
import DealWestern from '../models/deal.model.js'
import * as bcrypt from '../utils/bcrypt.utils.js'

export const validationAndMake = async (req, res) => {
    let cons=0
    const {nombre, email, id, monto, mdPago, nroTarjeta, expMonth, expYear, cv, franquicia, nroCuotas, nroReferencia} = req.body
    if (!nombre || !email || !id || !monto || ! mdPago || !nroTarjeta || !expMonth || !expYear || !cv || !franquicia || !nroCuotas || !nroReferencia) {
        return res.status(400).json({ message: 'Error', reason: 'Missing parameters' })
    }
    if (monto < 1) return res.status(400).json({ message: 'Error', reason: 'Amount must be greater than 0' })
    if (nroCuotas < 1) return res.status(400).json({message: 'Error', reason: 'Dues must be greater than 0'})
    try {
        const tran = await DealWestern.findOne({reference_number: {$eq: nroReferencia}})
        if (tran != null) return res.status(400).json({message: 'Error', reason: 'Transaction in process'})
        const newTran = await DealWestern.create({ reference_number:nroReferencia})
        const card = await CardWestern.findOne({card_number: {$eq: nroTarjeta}})
        if (card === null) return res.status(400).json({message: 'Error', reason: 'Card do not exits'})
        const owner = await OwnerWestern.findOne({DNI: {$eq: id}})
        if (owner === null) return res.status(400).json({message: 'Error', reason: 'User do not exits'})
        if (owner.name != nombre || owner.email != email ) return res.status(400).json({message: 'Error', reason: 'User do not have this card'})
        if (card.owner != nombre) return res.status(400).json({message: 'Error', reason: 'User do not have this card'})
        if (card.card_type_id != mdPago || card.card_franchise_id != franquicia) return res.status(400).json({message: 'Error', reason: 'Bad type or franchise'})
        if (!bcrypt.confirmPassword(card.exp_month, expMonth) || !bcrypt.confirmPassword( card.exp_year, expYear) || !bcrypt.confirmPassword( card.cvv, cv)) return res.status(401).json({ message: 'Wrong parameters' })
        let discont
        if (mdPago == 1) discont = nroCuotas
        else discont = 1
        const valor = monto/discont
        if (card.amount < valor) return res.status(400).json({message: 'Error', reason: 'Insufficient balance'})
        card.amount = card.amount - parseInt(valor)
        await card.save()
        const data = {
            "successful":true,
            "ref_number":nroReferencia,
            "effective_date": new Date().toISOString(),
            "amount":monto,
            "balance":valor,
            "dues_number": nroCuotas,
            "fulfilled":true
        }
        return res.status(200).json({message: 'OK', reason: 'Succesful', data})
    } catch(err){
        return res.status(500).json({err})
    }
}
